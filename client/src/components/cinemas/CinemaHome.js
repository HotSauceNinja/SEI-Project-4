import React from 'react'
import CinemaIndex from './CinemaIndex'
import photo from '../images/cinemasBlue.png'

function CinemaHome() {
  return (
    <div className="section has-background-dark">
      <div>
        <h1 className="title has-text-centered has-text-info-light">Cinemas</h1>
        <div className="columns">
          <div className="column is-one-third">
            <CinemaIndex />
          </div>
          <div className="column is-two-thirds">
            <img src={photo}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CinemaHome