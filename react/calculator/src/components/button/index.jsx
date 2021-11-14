import React from 'react'
import './style.css'

export default props => {
  let classes = 'button '

  if (props.operation)
    classes += 'operation '

  if (props.double)
    classes += 'double '

  if (props.triple)
    classes += 'triple '
  
  return (
    <button
      className={classes}
      onClick={event => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  )
}