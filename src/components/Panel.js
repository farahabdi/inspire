import React, { Component } from 'react'

const Panel = ({ shuffle, reset, boardStatus }) => {

  return (
    <div className="panel">
        <a className="btn" onClick={shuffle}><span>Shuffle</span></a>
        <a className="btn" onClick={reset}><span>Reset</span></a>
        <a className="btn" disabled><span>{ boardStatus ? "WIN" : "LOSING"}</span></a>
    </div>
    )
}

export default Panel
