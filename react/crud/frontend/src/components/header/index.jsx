import React from 'react'
import './style.css'

export default function Header({ icon, title, description }) {
  return (
    <header className="header d-flex flex-column">
      <h1 className="header__title mt-3">
        <i className={`fa fa-${icon}`}></i> {title}
      </h1>
      <p className="header__description text-muted">{description}</p>
    </header>
  )
}