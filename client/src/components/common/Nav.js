import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, logoutUser } from '../../lib/auth'

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
    <div className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          { !isLoggedIn ?
            <Link to="/" className="navbar-item has-text-info"><strong>FASTival</strong></Link>
            :
            null}
          <Link to="/schedule/" className="navbar-item">Schedule</Link>
          <Link to="/films/" className="navbar-item">Films</Link>   
          <Link to="/cinemas/" className="navbar-item">Cinemas</Link>    
        </div>
      
        <div className="navbar-menu has-background-dark is-active">
          <div className="navbar-end">
            <div className="navbar-item has-dropdown has-background-dark is-hoverable">
              <div className="navbar-item has-background-dark has-text-info-light">User</div>

              { !isLoggedIn ?
                <div className="navbar-dropdown has-background-dark is-right ">
                  <Link to="/login/" className="navbar-item has-text-info">Login</Link>
                  <Link to="/register/" className="navbar-item has-text-info">Register</Link>
                </div>
                :
                <div className="navbar-dropdown has-background-dark is-right">
                  {/* <Link to={`/auth/${id}/`}  className="navbar-item is-expanded has-text-info">Profile</Link> */}
                  <button className="navbar-item button is-small is-left is-dark has-text-info" onClick={handleLogout}>Logout</button>
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