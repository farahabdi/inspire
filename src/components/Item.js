import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Item = ({ number, isEmpty, isValid, onSelect }) => {
  const classes = classnames(
    'board__item',
    {
      [`board__item--empty`]: isEmpty, // Hide item with 'visibility: hidden' when class active
      [`board__item--valid`]: isValid  // Show green background when class active
    }
  )

  return (
    <div id={number} onClick={onSelect} className={classes}>
      <div className='board__text'>
        { number + 1 }
      </div>
    </div>
  )
}

Item.propTypes = {
  number: PropTypes.number,
  isEmpty:PropTypes.bool,
  isValid: PropTypes.bool,
  onSelect: PropTypes.func
}

export default Item
