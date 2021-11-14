import React, { Component } from 'react'

export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    const { message, name } = this.state

    return (
      <div>
        <h1>{message} {name} !</h1>
        <hr />
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Mensagem"
          onChange={this.handleMessageChange}
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Nome"
          onChange={this.handleNameChange}
        />
      </div>
    )
  }
}