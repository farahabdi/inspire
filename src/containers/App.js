import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Items from './Items'
import Board from './Board'
import { validMoves, generateRandom, shuffle, checkGameStatus } from './utils'
import _ from 'lodash'

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            validPositions: [],
            emptyIndex: 15,
            boardComplete: false
        };
      }

      handleItemClick = (e) => {
        const { items, emptyIndex, validPositions } = this.state
        let number = parseInt(e.target.id)

        // Find the actual key in the dom array as they may not be in order
        number= _.findIndex(items, item => item.key == number);

        // If item clicked is not a valid move just return
        if (validPositions.indexOf(number) === -1) {
            return
        }

        // The item clicked will be the new emptyItem, and generate validPositions from that
        const newEmptyIndex = number
        const newValidPositions = validMoves(newEmptyIndex)

        const newItems = this.rearrangeBoard(items, number, emptyIndex)

        this.setState({
            emptyIndex: newEmptyIndex,
            validPositions: newValidPositions,
            items: newItems
        })
        
      }

      rearrangeBoard = (items, number, emptyIndex) => {
        const b = items[number];
        items[number] = items[emptyIndex];
        items[emptyIndex] = b
        return items
      }
      
      generateItems = () => {
        const numbers = Array.from({length: 16}, (v, i) => i)
        const listItems = numbers.map(number =>
            <Items
                key={number.toString()}
                number={number}
                onSelect={this.handleItemClick}
            />
        );
        return listItems
      }
      
    
      componentWillMount = () => {
        const items = this.generateItems()
        const validPositions = validMoves(15)

        this.setState({ items, validPositions })
      }

      checkBoard = () => {
          this.setState({
            boardComplete: checkGameStatus(this.state.items)
          })
      }

      shuffleBoard = () => {
        const { items, emptyIndex } = this.state

        const newItems = shuffle(items)
        const newEmptyIndex = generateRandom()
        const newvalidPositions = validMoves(newEmptyIndex)


        this.setState({
            items: newItems,
            emptyIndex: newEmptyIndex,
            validPositions: newvalidPositions
        })

        
      }
      
    render() {

        const { items, emptyIndex, validPositions, boardComplete } = this.state
      
        return (
            <div className="container">
                <Board
                    shuffle={this.shuffleBoard}
                    emptyIndex={emptyIndex}
                    validPositions={validPositions}
                    boardComplete={boardComplete}
                >
                    { items }
                </Board>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
