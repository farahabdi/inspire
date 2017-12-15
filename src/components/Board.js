import React, { Component } from 'react'

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

        </div>
    )
  }
}

export default Board
