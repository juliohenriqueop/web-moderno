import React from 'react'
import { Link } from 'react-router-dom'
import Cod3rLogo from '../../assets/imgs/logo.png'
import './style.css'

export default function Logo() {
  return (
    <aside className="logo">
      <Link className="logo__link" to="/">
        <img className="logo__image" src={Cod3rLogo} alt="Cod3r Logo"/>
      </Link>
    </aside>
  )
}