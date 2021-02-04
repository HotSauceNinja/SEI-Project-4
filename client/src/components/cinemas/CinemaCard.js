import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'

function CinemaCard({ id, name, image, address, phoneNumber, contactName, slots, latitude, longitude }) {

  console.log('lat ', latitude)
  console.log('long ', longitude)

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
            <br />

            <div className="columns">
              <div className="column is-half">
                <figure className="card-image">
                  <img src={image} alt={name} className="is-square" />
                </figure>

                <div className="card-content has-text-info-light">
                  <div>{address}</div>
                  <div><strong>{phoneNumber}</strong></div>
                  <br />
                  <p>Staff Contact: <strong>{contactName}</strong></p>
                </div>
              </div>

              <div className="column is-half map-container">
                <ReactMapGL
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  height="100%"
                  width="100%"
                  mapStyle="mapbox://styles/mapbox/dark-v10"
                  latitude= {parseFloat(latitude)}
                  longitude= {parseFloat(longitude)}
                  zoom= {14}
                >
                  <Marker 
                    latitude= {parseFloat(latitude)}
                    longitude= {parseFloat(longitude)}
                  >📍</Marker>

                </ReactMapGL>

              </div>
            </div>

            <div className="card-content has-text-info">
              <h2>Scheduling Slots</h2>
              { !slots ?
                <div className="has-text-info-light">There are no slots available for this cinema</div>
                :
                <div className="has-text-info-light">
                  {slots.map(slot => (
                    <div key={slot.id}>
                      {slot.startTime} to {slot.endTime}: &nbsp;&nbsp; { slot.film ? 
                        <span>
                          <strong>{slot.film}</strong></span>
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