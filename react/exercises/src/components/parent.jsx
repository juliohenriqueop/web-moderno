import React from 'react'

export default props => (
  <>
    <h1>Familia</h1>
    <h2>Pai: {props.firstName} {props.lastName}</h2>
    <br/>
    <h3>Filhos:</h3>
    <ul>
      {
        React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            ...props,
            ...child.props
          })
        })
      }
    </ul>
  </>
)