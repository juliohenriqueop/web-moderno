import React from 'react'

export const Evening = props => (
  <React.Fragment>
    <h1>Hello {props.name},</h1>
    <h2>good evening !</h2>
  </React.Fragment>
)

export const Night = props => (
  <React.Fragment>
    <h1>Hello {props.name},</h1>
    <h2>good night !</h2>
  </React.Fragment>
)

export default {
  Evening,
  Night
}