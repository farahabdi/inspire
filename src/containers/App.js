import React, { Component } from 'react'
import { Item, Board, Panel } from '../components'
import { validMoves, shuffle, gameStatus, swap } from '../utils'
import findIndex from 'lodash/findIndex'

const COMPLETE = true
const BOARD_SIZE = 16
const INITIAL_EMPTY_INDEX = 15

export class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      validPositions: [],
      emptyIndex: INITIAL_EMPTY_INDEX,
      boardStatus: COMPLETE
    }
  }

  /**
  * Load initial config before mounting app
  */

  componentWillMount = () => {
    this.setState({
      list: this.generateList(),
      boardStatus: COMPLETE,
      validPositions: validMoves(this.state.emptyIndex)
    })
  }
  /**
  * Generate initial board on win state
  */

  generateList = () => {
    const numbers = Array.from({ length: BOARD_SIZE }, (v, i) => i)
    const newList = numbers.map(number =>
      <Item
        key={number.toString()}
        number={number}
        onSelect={this.handleItemClick}
      />
        )
    return newList
  }

  /**
  * Shuffle board
  */

  shuffleBoard = () => {
    const { list } = this.state
    const shuffledList = shuffle(list)
    // Go through the dom nodes in array and locate the index where node with property key=item-15 (empty) is found.
    const emptyIndex = findIndex(shuffledList, item => item.key === `${INITIAL_EMPTY_INDEX}`)

    this.setState({
      list: shuffledList,
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
    const { list, emptyIndex, validPositions } = this.state
    // Find the actual key in the dom array as they may not be in order
    const itemIndex = findIndex(list, item => item.key === e.target.id)
    // If item clicked is not a valid move just return
    if (validPositions.indexOf(itemIndex) === -1) {
      return
    }
    // Swap the item that was clicked, with the empty item
    const newList = swap(list, itemIndex, emptyIndex)
    this.setState({
      emptyIndex: itemIndex,
      validPositions: validMoves(itemIndex),
      list: newList,
      boardStatus: gameStatus(newList)
    })
  }

  /**
  * Reset board to initial settings
  */

  reset = () => {
    this.setState({
      list: this.generateList(),
      emptyIndex: INITIAL_EMPTY_INDEX,
      validPositions: validMoves(INITIAL_EMPTY_INDEX),
      boardStatus: COMPLETE
    })
  }

  render () {
    const { list, emptyIndex, validPositions, boardStatus } = this.state

    return (
      <div className='container'>
        <Board
          emptyIndex={emptyIndex}
          validPositions={validPositions}
          boardStatus={boardStatus}
        >
          {list}
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
