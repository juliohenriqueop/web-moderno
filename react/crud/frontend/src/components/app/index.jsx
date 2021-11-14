import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Logo from '../logo'
import Menu from '../menu'
import Footer from '../footer'
import Routes from '../../routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.css'

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__logo">
          <Logo />
        </div>
        <div className="app__menu">
          <Menu />
        </div>
        <main className="app__content">
          <Routes />
        </main>
        <div className="app__footer">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}
