import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({ shuffle, reset, boardStatus }) => {
  return (
    <div className='panel'>
      <a className='button' onClick={shuffle}><span>Shuffle</span></a>
      <a className='button' onClick={reset}><span>Reset</span></a>
      <a className='button' disabled><span>{ boardStatus ? 'WINNER' : 'LOSER'}</span></a>
    </div>
  )
}

Panel.propTypes = {
  shuffle: PropTypes.func,
  reset: PropTypes.func,
  boardStatus: PropTypes.bool
}
export default Panel
