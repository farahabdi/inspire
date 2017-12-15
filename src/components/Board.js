import React, { Component } from 'react'
import Items from './Items'

export class Board extends Component {

  render() {

    const { emptyIndex, validPositions, boardComplete } = this.props
    
    let items = React.Children.map(this.props.children, (child, index) => {
        if (index === emptyIndex)
          return React.cloneElement(child, { isEmpty: true })

        else if (validPositions.indexOf(index) != -1) {
           return React.cloneElement(child, { isValid: true })
        }
        else
          return child
      })
    return (
        <div className="board">
            { items }
            <button className="btn" onClick={()=>{this.props.shuffle()}}>SHUFFLE</button>

            <div className="notice">Game is complete: { boardComplete ? "Yes" : "No"} </div>
        </div>
    )
  }
}

export default Board
