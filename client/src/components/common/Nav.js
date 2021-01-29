import React from 'react'
import { Link } from 'react-router-dom'

function Nav(){
  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/schedule/" className="navbar-item">Schedule</Link>
          <Link to="/films/" className="navbar-item">Films</Link>      
        </div>
      
        <div className="navbar-menu is-active">
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-item">User</div>
              <div className="navbar-dropdown is-right">
                <Link to="/profile" className="navbar-item">Profile</Link>
                <Link to="/login/" className="navbar-item">Login</Link>
                <Link to="/register/" className="navbar-item">Register</Link>
              </div>
            </div>
            <div ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav