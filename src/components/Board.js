import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Board extends Component {
  render () {
    const { emptyIndex, validPositions } = this.props
    let items = React.Children.map(this.props.children, (child, index) => {
      if (index === emptyIndex) {
        return React.cloneElement(child, { isEmpty: true })
      } else if (validPositions.indexOf(index) != -1) {
        return React.cloneElement(child, { isValid: true })
      } else return child
    })

    return (
      <div className='board'>
        { items }
      </div>
    )
  }
}

Board.propTypes = {
  children: PropTypes.element.isRequired,
  emptyIndex: PropTypes.element.isRequired,
  validPositions: PropTypes.element.isRequired
}
export default Board
