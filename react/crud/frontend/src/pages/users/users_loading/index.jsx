import React from 'react'
import './style.css'

export default function UsersLoading() {
  return (
    <div className="users__loading d-flex justify-content-center
      align-items-center">
      <i className="users__spinner fas fa-spinner text-muted"></i>
    </div>
  )
}