import React, { Component } from 'react'

import Header from '../../components/header'
import Content from '../../components/content'
import UsersTable from './users_table'
import UsersForm from './users_form'
import UsersLoading from './users_loading'

import UsersService from '../../services/users'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

export default class UsersPage extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      currentUser: {
        id: 0,
        name: '',
        email: ''
      },

      users: [],
    }

    this.state = { ...this.initialState }
  }

  sortUsersById = users => {
    const updatedUsers = [...users]
    updatedUsers.sort((userA, userB) => userA.id - userB.id)

    return updatedUsers
  }

  findFirstAvailableUserId = users => {
    let firstAvailableUserId = users.length + 1
    let previousUser = null

    for (let currentUser of users) {
      if (previousUser) {
        const difference = currentUser.id - previousUser.id
        if (difference > 1) {
          firstAvailableUserId = previousUser.id + 1
          break
        }
      }
      previousUser = currentUser
    }

    return firstAvailableUserId
  }

  loadUsers = async () => {
    this.setState({ users: { ...this.initialState.users } })

    setTimeout(async () => {

      const users = await UsersService.loadUsers()
      const sortedUsers = this.sortUsersById(users)

      this.setState({ users: sortedUsers })
    }, 1000)
  }

  async componentDidMount() {
    await this.loadUsers()
  }

  insertUserTo = (users, user) => {
    const updatedUsers = [...users]
    const insertPosition = user.id - 1

    updatedUsers.splice(insertPosition, 0, user)

    return updatedUsers
  }

  removeUserFrom = (users, user) => {
    const updatedUsers = [...users]
    const removePosition = user.id - 1

    updatedUsers.splice(removePosition, 1)

    return updatedUsers
  }

  replaceUserOn = (users, user) => {
    const updatedUsers = [...users]
    const replacePosition = user.id - 1

    updatedUsers.splice(replacePosition, 1, user)

    return updatedUsers
  }

  updateUser = async user => {
    await UsersService.updateUser(user)

    const users = [...this.state.users]
    const updatedUsers = this.replaceUserOn(users, user)

    this.setState({
      currentUser: { ...this.initialState.currentUser },
      users: updatedUsers
    })
  }

  createUser = async (name, email) => {
    const users = [...this.state.users]
    const nextAvailableUserId = this.findFirstAvailableUserId(users)

    const id = nextAvailableUserId
    const user = { id, name, email }

    await UsersService.saveUser(user)

    const updatedUsers = this.insertUserTo(users, user)

    this.setState({
      currentUser: { ...this.initialState.currentUser },
      users: updatedUsers
    })
  }

  handleSaveClick = async (name, email) => {
    const id = this.state.currentUser.id
    const user = { id, name, email }

    if (id > 0) {
      this.updateUser(user)
    }
    else {
      this.createUser(name, email)
    }
  }

  handleCancelClick = () => {
    this.setState({ currentUser: { ...this.initialState.currentUser } })
  }

  handleEditUserClick = user => {
    this.setState({ currentUser: user })
  }

  handleDeleteUserClick = user => {
    UsersService.deleteUser(user)

    const deletedUserId = user.id
    let currentUserId = this.state.currentUser.id

    if (deletedUserId === currentUserId) {
      currentUserId = 0
    }

    const users = [...this.state.users]
    const updatedUsers = this.removeUserFrom(users, user)

    this.setState({
      currentUser: {
        id: currentUserId
      },
      users: updatedUsers
    })
  }

  render = () => {
    return (
      <div className="users">
        <div className="users__header">
          <Header
            icon="users"
            title="Usuários"
            description="Cadastro de usuários: Incluir, Listar, Alterar e Excluir."
          />
        </div>
        <div className="users__content">
          <Content>
            <UsersForm
              key={this.state.currentUser.id}
              initialName={this.state.currentUser.name}
              initialEmail={this.state.currentUser.email}
              onSaveClick={this.handleSaveClick}
              onCancelClick={this.handleCancelClick}
            />
          </Content>
          <Content>
            {this.state.users.length > 0 ?
              <UsersTable
                users={this.state.users}
                onEditUserClick={this.handleEditUserClick}
                onDeleteUserClick={this.handleDeleteUserClick}
                onReloadUsersClick={this.loadUsers}
              /> :
              <UsersLoading />}
          </Content>
        </div>
      </div>
    )
  }
}