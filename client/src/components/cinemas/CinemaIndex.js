import React from 'react'
import { getAllCinemas } from '../../lib/api'
import { Link } from 'react-router-dom'

function CinemaIndex() {

  const [cinemas, setCinemas] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCinemas()
        setCinemas(data)
      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [])

  // console.log('cinemas', cinemas)


  return (
    <section className="has-background-dark">
      <div className="container has-background-dark">

        <div className="container">
          {!cinemas ? 
            <div className="hero is-fullheight title has-text-info-light">
              { hasErr ? 
                <div className="hero-body">
                  <div className="container has-text-centered has-text-info-light">Something went wrong</div>
                </div> 
                : 
                <div className="hero-body">
                  <div className="container has-text-centered has-text-info-light">Loading</div>
                </div>
              }
            </div>
            :
            <div className="columns is-multiline">
              {cinemas.map(cinema => (
                <div key={cinema.id} className="column is-full">
                  <div className="card has-background-grey-dark">
                    <Link to={`/cinemas/${cinema.id}/`}>
                      <div className="container">
                        <div className="card-header">
                          <div className="card-header-title is-centered has-text-info">{cinema.name}</div>
                        </div>

                        <div className="card-content has-text-info-light">
                          <div>{cinema.address}</div>
                          <div><strong>{cinema.phoneNumber}</strong></div>
                        </div>
                      </div>        
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default CinemaIndex