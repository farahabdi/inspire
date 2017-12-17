import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({ shuffle, reset, boardStatus }) => {
  return (
    <div className='panel'>
      <a className='button' onClick={shuffle}><span>Shuffle</span></a>
      <a className='button' onClick={reset}><span>Reset</span></a>
      <a className='button' disabled><span>{ boardStatus ? 'WIN' : 'LOSING'}</span></a>
    </div>
  )
}

Panel.propTypes = {
  shuffle: PropTypes.element.isRequired,
  reset: PropTypes.element.isRequired,
  boardStatus: PropTypes.element.isRequired
}
export default Panel
