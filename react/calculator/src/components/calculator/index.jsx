import React, { Component } from 'react'
import Display from '../display'
import Button from '../button'
import './style.css'

const initialState = {
  displayValue: '0',
  mustClearDisplay: false,
  operation: null,
  values: [0, 0],
  activeValue: 0
}

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    const updatedState = this.state

    updatedState.mustClearDisplay = true

    if (operation !== '=')
      updatedState.operation = operation

    if (this.state.activeValue === 0) {
      updatedState.activeValue = 1
    }
    else {
      const values = updatedState.values

      let result = 0
      switch (updatedState.operation) {
        case '+':
          result = values[0] + values[1]
          break
        case '-':
          result = values[0] - values[1]
          break
        case 'x':
          result = values[0] * values[1]
          break
        case '÷':
          result = values[0] / values[1]
          break
        default:
          result = updatedState.values[0]
          break
      }

      updatedState.activeValue = 0
      updatedState.values[0] = result
      updatedState.values[1] = 0

      updatedState.displayValue = `${result}`
    }

    this.setState(updatedState)
  }

  appendDigit = digit => {
    const updatedState = this.state

    if (updatedState.displayValue.includes('.') && digit === '.')
      return

    if (updatedState.displayValue === '0' && digit !== '.')
      updatedState.mustClearDisplay = true

    if (updatedState.mustClearDisplay)
      updatedState.displayValue = ''

    updatedState.displayValue += digit
    updatedState.mustClearDisplay = false

    if (digit !== '.') {
      const activeValue = updatedState.activeValue
      const values = updatedState.values

      const displayValue = updatedState.displayValue
      values[activeValue] = parseFloat(displayValue)

      updatedState.values = values
    }

    this.setState(updatedState)
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="÷" click={this.setOperation} operation />
        <Button label="7" click={this.appendDigit} />
        <Button label="8" click={this.appendDigit} />
        <Button label="9" click={this.appendDigit} />
        <Button label="x" click={this.setOperation} operation />
        <Button label="4" click={this.appendDigit} />
        <Button label="5" click={this.appendDigit} />
        <Button label="6" click={this.appendDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.appendDigit} />
        <Button label="2" click={this.appendDigit} />
        <Button label="3" click={this.appendDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.appendDigit} double />
        <Button label="." click={this.appendDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    )
  }
}