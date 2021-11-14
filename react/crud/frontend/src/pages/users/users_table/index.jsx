import React from 'react'
import './style.css'

export default function UserTable({
  users,
  onEditUserClick,
  onDeleteUserClick,
  onReloadUsersClick
}) {
  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th className="table__name">Nome</th>
            <th className="table__email">E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="user__row" key={index}>
              <td className="user__data">{user.id}</td>
              <td className="user__data user__name">{user.name}</td>
              <td className="user__data user__email">{user.email}</td>
              <td className="user__data">
                <div className="user__actions">
                  <button
                    className="btn btn-warning"
                    onClick={() => onEditUserClick(user)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteUserClick(user)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-link users__reload"
        onClick={onReloadUsersClick}>
        <i className="fas fa-sync-alt mr-2"></i>Atualizar
      </button>
    </>
  )
}