import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import SchedulingSlots from './components/slots/SchedulingSlots'
import FilmIndex from './components/films/FilmIndex'
import UserShow from './components/user/UserShow'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/scheduling/" component={SchedulingSlots} />
          <Route path="/films/" component={FilmIndex} />
          <Route path="/user/" component={UserShow} />
        </Switch>
      </div>
    </BrowserRouter>    
  )
}

export default App
