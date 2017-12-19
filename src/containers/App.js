import React, { Component } from 'react'
import { Item, Board, Panel } from '../components'
import { shuffle, gameStatus, swap, rules } from '../utils'
import findIndex from 'lodash/findIndex'

const COMPLETE = true
const BOARD_SIZE = 16

export class App extends Component {

  state = {
    list: [],
    validPositions: [],
    emptyIndex: BOARD_SIZE - 1,
    boardStatus: COMPLETE
  }

  /**
  * Load initial config before mounting app
  */

  componentWillMount = () => {
    this.setState({
      list: this.initialiseList(),
      validPositions: rules.get(`${BOARD_SIZE - 1}`)
    })
  }

  /**
  * Generate initial board on win state
  */

  initialiseList = () => {
    let list = []
    for (let index = 0; index < BOARD_SIZE; index++) {
      list.push(<Item
        key={`${index}`}
        number={index}
        onSelect={this.handleItemClick} />
      )
    }
    return list
  }

  /**
  * Shuffle board
  */

  shuffleBoard = () => {
    const { list } = this.state
    const shuffledList = shuffle(list)
    // Go through the dom nodes in array and locate the index where node with property key=item-15 (empty) is found.
    const emptyIndex = findIndex(shuffledList, item => item.key === `${BOARD_SIZE - 1}`)

    this.setState({
      list: shuffledList,
      emptyIndex: emptyIndex,
      validPositions: rules.get(`${emptyIndex}`),
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
      validPositions: rules.get(`${itemIndex}`),
      list: newList,
      boardStatus: gameStatus(newList)
    })
  }

  /**
  * Reset board to initial settings
  */

  reset = () => {
    this.setState({
      list: this.initialiseList(),
      emptyIndex: BOARD_SIZE - 1,
      validPositions: rules.get(`${BOARD_SIZE - 1}`),
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
