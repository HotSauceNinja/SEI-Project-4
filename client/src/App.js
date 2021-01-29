import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import SchedulingSlots from './components/slots/SchedulingSlots'
import FilmIndex from './components/films/FilmIndex'
import CinemaIndex from './components/cinemas/CinemaIndex'
import UserShow from './components/users/UserShow'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import FilmShow from './components/films/FilmShow'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/schedule/" component={SchedulingSlots} />
          <Route path="/films/:id" component={FilmShow} />
          <Route path="/films/" component={FilmIndex} />
          <Route path="/cinemas/" component={CinemaIndex} />
          <Route path="/profile/" component={UserShow} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>    
  )
}

export default App
