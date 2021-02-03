import React from 'react'
import { Link } from 'react-router-dom'

function CinemaCard({ id, name, image, address, phoneNumber, contactName, slots }) {
  return (
    <div className="card has-background-grey-dark">
      { !id ? 
        <div>no id</div>
        :
        <Link to={`/cinemas/${id}/`}>
          <div className="container">
            <div className="card-header">
              <div className="card-header-title is-centered has-text-info">{name}</div>
            </div>

            <figure className="card-image">
              <img src={image} alt={name} className="is-square" />
            </figure>

            <div className="card-content has-text-info-light">
              <div>{address}</div>
              <div><strong>{phoneNumber}</strong></div>
              <br />
              <div>Staff Contact: <strong>{contactName}</strong></div>
              <br />
              <div>Scheduling Slots</div>
              { !slots ?
                <div>There are no slots available for this cinema</div>
                :
                <div>
                  {slots.map(slot => (
                    <div key={slot.id}>
                      {slot.startTime} to {slot.endTime}: &nbsp;&nbsp; { slot.film ? 
                        <span><strong>{slot.film}</strong></span>
                        :
                        <span><strong>No film assigned yet</strong></span>}
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>        
        </Link>
      }
    </div>
  )
}

export default CinemaCard