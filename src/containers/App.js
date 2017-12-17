import React, { Component } from 'react'
import Item from '../components/Item'
import Board from '../components/Board'
import Panel from '../components/Panel'
import { validMoves, shuffle, gameStatus, swap } from '../utils'
import _ from 'lodash'

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            validPositions: [],
            emptyIndex: 15,
            boardStatus: false
        };
    }

    /**
     * Load initial config before mounting app
    */

    componentWillMount = () => {
        this.setState({
            items: this.generateItems(),
            boardStatus: true,
            validPositions: validMoves(this.state.emptyIndex)
        })
    }

    /**
     * Generate initial board on win state
    */

    generateItems = () => {
        const numbers = Array.from({ length: 16 }, (v, i) => i)
        const listItems = numbers.map(number =>
            <Item
                key={number.toString()}
                number={number}
                onSelect={this.handleItemClick}
            />
        );
        return listItems
    }

    /**
     * Shuffle board
    */

    shuffleBoard = () => {
        const { items } = this.state
        const shuffledItems = shuffle(items)

        // Go through the dom nodes in array and locate the index where node with property key=item-15 (empty) is found.
        const emptyIndex = _.findIndex(shuffledItems, item => item.key == 15);

        this.setState({
            items: shuffledItems,
            emptyIndex: emptyIndex,
            validPositions: validMoves(emptyIndex),
            boardStatus: false
        })
    }


   /**
     * Handle change event when clicking an item
     * @param {SytheticEvent} e
    */

    handleItemClick = (e) => {
        const { items, emptyIndex, validPositions } = this.state
        // Find the actual key in the dom array as they may not be in order
        const itemIndex = _.findIndex(items, item => item.key == parseInt(e.target.id));
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
            boardStatus: checkGameStatus(newItems)
        })
    }

    /**
     * Reset board to initial settings
    */

    reset = () => {
        this.setState({
            items: this.generateItems(),
            emptyIndex: 15,
            validPositions: validMoves(15),
            boardStatus: true
        })
    }


    render() {
        const { items, emptyIndex, validPositions, boardStatus } = this.state

        return (
            <div className="container">
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
