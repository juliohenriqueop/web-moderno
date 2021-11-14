import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function Menu() {
  return (
    <aside className="menu">
      <nav className="navigation">
        <Link className="navigation__link" to="/">
          <i className="fa fa-home">
            <span className="navigation__text">Início</span>
          </i> 
        </Link>
        <Link className="navigation__link" to="/usuarios">
          <i className="fa fa-users">
            <span className="navigation__text">Usuários</span>
          </i> 
        </Link>
      </nav>
    </aside>
  )
}