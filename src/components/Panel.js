import React, { Component } from 'react'

const Panel = ({ shuffle, reset, boardStatus }) => {

  return (
    <div className="panel">
        <a className="button" onClick={shuffle}><span>Shuffle</span></a>
        <a className="button" onClick={reset}><span>Reset</span></a>
        <a className="button" disabled><span>{ boardStatus ? "WIN" : "LOSING"}</span></a>
    </div>
    )
}

export default Panel
