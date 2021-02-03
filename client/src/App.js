import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import SchedulingSlots from './components/slots/SchedulingSlots'
import FilmIndex from './components/films/FilmIndex'
import CinemaHome from './components/cinemas/CinemaHome'
import UserShow from './components/users/UserShow'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import FilmShow from './components/films/FilmShow'
import FilmNew from './components/films/FilmNew'
import FilmEdit from './components/films/FilmEdit'
import SlotIndex from './components/slots/SlotIndex'
import SlotNew from './components/slots/SlotNew'
import SlotEdit from './components/slots/SlotEdit'
import CinemaShow from './components/cinemas/CinemaShow'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/schedule/" component={SchedulingSlots} />
          <Route path="/films/:id/edit" component={FilmEdit} />
          <Route path="/films/new/" component={FilmNew} />
          <Route path="/films/:id/" component={FilmShow} />
          <Route path="/films/" component={FilmIndex} />
          <Route path="/slots/:id/edit/" component={SlotEdit} />
          <Route path="/slots/new/" component={SlotNew} />
          <Route path="/slots/" component={SlotIndex} />
          <Route path="/cinemas/:id/" component={CinemaShow} />
          <Route path="/cinemas/" component={CinemaHome} />
          <Route path="/profile/" component={UserShow} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>    
  )
}

export default App
