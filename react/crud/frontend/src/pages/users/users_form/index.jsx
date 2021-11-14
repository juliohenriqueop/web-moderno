import React, { Component } from 'react'
import './style.css'

export default class UsersForm extends Component {
  constructor(props) {
    super(props)

    this.initialName = props.initialName
    this.initialEmail = props.initialEmail

    this.onSaveClick = props.onSaveClick
    this.onCancelClick = props.onCancelClick

    this.nameRef = React.createRef()
    this.emailRef = React.createRef()
  }

  render = () => {
    return (
      <form noValidate>
        <div className="form-row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Digite um nome"
                defaultValue={this.initialName}
                ref={this.nameRef}
                required
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Digite um e-mail"
                defaultValue={this.initialEmail}
                ref={this.emailRef}
                required
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="form-row">
          <div className="col-12 d-flex justify-content-center justify-content-lg-end">
            <button
              className="btn btn-primary mr-5 mr-md-3 mr-lg-1"
              type="button"
              onClick={() => this.onSaveClick(
                this.nameRef.current.value,
                this.emailRef.current.value)}
              >
                <i className="fas fa-save mr-2"></i>
                Salvar
              </button>
            <button
              className="btn btn-danger ml-5 ml-md-3 ml-lg-1"
              type="reset"
              onClick={() => this.onCancelClick()}
            >
              <i className="fas fa-ban mr-2"></i>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    )
  }
}