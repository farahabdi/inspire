import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Board extends Component {
  render () {
    const { emptyIndex, validPositions, children } = this.props
    let list = React.Children.map(children, (child, index) => {
      if (index === emptyIndex) {
        return React.cloneElement(child, { isEmpty: true })
      } else if (validPositions.indexOf(index) !== -1) {
        return React.cloneElement(child, { isValid: true })
      } else return child
    })

    return (
      <div className='board'>
        { list }
      </div>
    )
  }
}

Board.propTypes = {
  children: PropTypes.array,
  emptyIndex: PropTypes.number,
  validPositions: PropTypes.array
}
export default Board
