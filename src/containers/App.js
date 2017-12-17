import React, { Component } from 'react'
import Item from '../components/Item'
import Board from '../components/Board'
import Panel from '../components/Panel'
import { validMoves, shuffle, gameStatus, swap } from '../utils'
import _ from 'lodash'

const COMPLETE = true
const BOARD_SIZE = 16
const INITIAL_EMPTY_INDEX = 15

export class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      validPositions: [],
      emptyIndex: INITIAL_EMPTY_INDEX,
      boardStatus: !COMPLETE
    }
  }

    /**
     * Load initial config before mounting app
    */

  componentWillMount = () => {
    this.setState({
      items: this.generateItems(),
      boardStatus: COMPLETE,
      validPositions: validMoves(this.state.emptyIndex)
    })
  }

    /**
     * Generate initial board on win state
    */

  generateItems = () => {
    const numbers = Array.from({ length: BOARD_SIZE }, (v, i) => i)
    const listItems = numbers.map(number =>
      <Item
        key={number.toString()}
        number={number}
        onSelect={this.handleItemClick}
            />
        )
    return listItems
  }

    /**
     * Shuffle board
    */

  shuffleBoard = () => {
    const { items } = this.state
    const shuffledItems = shuffle(items)

    // Go through the dom nodes in array and locate the index where node with property key=item-15 (empty) is found.
    const emptyIndex = _.findIndex(shuffledItems, item => item.key == INITIAL_EMPTY_INDEX);

    this.setState({
      items: shuffledItems,
      emptyIndex: emptyIndex,
      validPositions: validMoves(emptyIndex),
      boardStatus: !COMPLETE
    })
  }

   /**
     * Handle change event when clicking an item
     * @param {SytheticEvent} e
    */

  handleItemClick = (e) => {
    const { items, emptyIndex, validPositions } = this.state
    // Find the actual key in the dom array as they may not be in order
    const itemIndex = _.findIndex(items, item => item.key === parseInt(e.target.id))
    // If item clicked is not a valid move just return
    if (validPositions.indexOf(itemIndex) === -1) {
      return
    }
    // Swap the item that was clicked, with the empty item
    const newItems = swap(items, itemIndex, emptyIndex)
    this.setState({
      emptyIndex: itemIndex,
      validPositions: validMoves(itemIndex),
      items: newItems,
      boardStatus: gameStatus(newItems)
    })
  }

    /**
     * Reset board to initial settings
    */

  reset = () => {
    this.setState({
      items: this.generateItems(),
      emptyIndex: INITIAL_EMPTY_INDEX,
      validPositions: validMoves(INITIAL_EMPTY_INDEX),
      boardStatus: COMPLETE
    })
  }

  render () {
    const { items, emptyIndex, validPositions, boardStatus } = this.state

    return (
      <div className='container'>
        <Board
          emptyIndex={emptyIndex}
          validPositions={validPositions}
          boardStatus={boardStatus}
                >
          {items}
        </Board>

        <Panel
          reset={this.reset}
          boardStatus={boardStatus}
          shuffle={this.shuffleBoard}
                />
      </div>
    )
  }
}

export default App
