import React from 'react'
import { Button } from 'react-bootstrap'

export default function Error(props) {
  return (
    <div className="error">
      <span>{props.message}</span>
      <button onClick={props.clearError} >X</button>
    </div>
  )
}
