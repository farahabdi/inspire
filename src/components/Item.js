import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Item = ({ number, isEmpty, isValid, onSelect }) => {
  const classes = classnames(
    'board__item',
    {
      [`board__item--empty`]: isEmpty,
      [`board__item--valid`]: isValid
    }
  )

  return (
    <div id={number} onClick={onSelect} className={classes}>
      <div className='board__text'>
        { number }
      </div>
    </div>
  )
}

Item.propTypes = {
  number: PropTypes.element.isRequired,
  isEmpty: PropTypes.element.isRequired,
  isValid: PropTypes.element.isRequired,
  onSelect: PropTypes.element.isRequired,
}

export default Item
