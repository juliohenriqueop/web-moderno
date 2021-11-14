import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import HomePage from './pages/home'
import UsersPage from './pages/users'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/usuarios" component={UsersPage} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}