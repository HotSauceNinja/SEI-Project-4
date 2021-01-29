import React from 'react'
import { Link } from 'react-router-dom'

function CinemaCard({ name, image, address, phoneNumber, contactName }) {
  return (
    <div className="card">
      <Link to="/cinemas/${id}" >
        <div className="container">
          <div className="card-header">
            <div className="card-header-title is-centered">{name}</div>
          </div>

          <figure className="card-image">
            <img src={image} alt={name} className="is-square" />
          </figure>

          <div className="card-content">
            <div>{address}</div>
            <div><strong>{phoneNumber}</strong></div>
            <br />
            <div>Staff Contact: <strong>{contactName}</strong></div>
          </div>
        </div>        
      </Link>
    </div>
  )
}

export default CinemaCard