import React from 'react'
import ReactDOM from 'react-dom'

import Parent from './components/parent'
import Children from './components/children'

const components = (
  <>
    <Parent firstName="Paulo" lastName="Silva">
      <Children firstName="Pedro" />
      <Children firstName="Paulo" />
      <Children firstName="Carla" />
    </Parent>
  </>
)

ReactDOM.render(components, document.getElementById('root'))