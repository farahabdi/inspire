import React, { Component } from 'react'
import classnames from 'classnames'


export class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
      }

  render() {

    const { number, isEmpty, isValid, onSelect} = this.props

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
}

export default Item
