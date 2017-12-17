import React, { Component } from 'react'
import Item from '../components/Item'
import Board from '../components/Board'
import { validMoves, generateRandom, shuffle, checkGameStatus } from '../utils'
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

      componentWillMount = () => {
        this.setState({ 
            items: this.generateItems(),
            boardComplete: true,
            validPositions: validMoves(this.state.emptyIndex)
        })
      }

      generateItems = () => {
        const numbers = Array.from({length: 16}, (v, i) => i)
        const listItems = numbers.map(number =>
            <Item
                key={number.toString()}
                number={number}
                onSelect={this.handleItemClick}
            />
        );
        return listItems
      }
      
      shuffleBoard = () => {
        const { items } = this.state
        const newItems = shuffle(items)

        // Go through the dom nodes and check the keys of each for where number 15 is located
        // inside the array.
        const emptyIndex = _.findIndex(newItems, item => item.key == 15);

        this.setState({
            items: newItems,
            emptyIndex: emptyIndex,
            validPositions: validMoves(emptyIndex),
            boardComplete: false
        })
      }

      handleItemClick = (e) => {
        const { items, emptyIndex, validPositions } = this.state
        let itemIndex = parseInt(e.target.id)
        // Find the actual key in the dom array as they may not be in order
        itemIndex= _.findIndex(items, item => item.key == itemIndex);
        // If item clicked is not a valid move just return
        if (validPositions.indexOf(itemIndex) === -1) {
            return
        }
        // The item clicked will be the new emptyItem, and generate validPositions from that
        const newValidPositions = validMoves(itemIndex)

        // Swap the item that was clicked, with the empty item
        const newItems = this.swapItems(items, itemIndex, emptyIndex)


        this.setState({
            emptyIndex: itemIndex,
            validPositions: newValidPositions,
            items: newItems,
            boardComplete: checkGameStatus(newItems)
        })
      }

      swapItems = (items, number, emptyIndex) => {
        const b = items[number];
        items[number] = items[emptyIndex];
        items[emptyIndex] = b
        return items
      }
    

      reset = () => {
          this.setState({
            items: this.generateItems(),
            emptyIndex: 15,
            validPositions: validMoves(15) ,
            boardComplete: true
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

                <div className="panel">
                    <a className="btn" onClick={this.shuffleBoard}><span>Shuffle</span></a>
                    <a className="btn" onClick={this.reset}><span>Reset</span></a>
                    <a className="btn" disabled><span>{ boardComplete ? "WIN" : "LOSING"}</span></a>
                </div>
            </div>
        )
    }
}

export default App
