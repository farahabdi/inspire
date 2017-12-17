import React, { Component } from 'react'
import classnames from 'classnames'

const Item = ({ number, isEmpty, isValid, onSelect}) => {
  const classes = classnames(
    'board__item',
    {
      [`board__item--empty`]: isEmpty,
      [`board__item--valid`]: isValid
    }
  );
    return (
      <div id={number} onClick={(e) => onSelect(e)} className={classes}>
            <div className="board__text">
                { number }
            </div>
        </div>
      )
  }
  
  export default Item
  