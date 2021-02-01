import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, logoutUser } from '../lib/auth'

function Nav(){
  // accesses the history object, which is used to navigate to other routes
  const history = useHistory()

  // checks if user is authenticated (has valid token)
  const isLoggedIn = isAuthenticated()

  // accesses the location object, which contains the current URL location
  useLocation()

  const handleLogout = () => {
    logoutUser()
    history.push('/')
  }


  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/schedule/" className="navbar-item">Schedule</Link>
          <Link to="/films/" className="navbar-item">Films</Link>   
          <Link to="/cinemas/" className="navbar-item">Cinemas</Link>    
        </div>
      
        <div className="navbar-menu is-active">
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-item">User</div>

              { !isLoggedIn ?
                <div className="navbar-dropdown is-right">
                  <Link to="/login/" className="navbar-item">Login</Link>
                  <Link to="/register/" className="navbar-item">Register</Link>
                </div>
                :
                <div className="navbar-dropdown is-right">
                  <Link to="/profile/" className="navbar-item is-expanded">Profile</Link>
                  <button className="navbar-item button is-small is-left is-inverted is-danger" onClick={handleLogout}>Logout</button>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav