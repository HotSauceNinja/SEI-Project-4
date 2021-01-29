import React from 'react'
import { getAllCinemas } from '../lib/api'
import CinemaCard from './CinemaCard'

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

  console.log('cinemas', cinemas)


  return (
    <div className="container">
      <h1 className="title has-text-centered">Cinemas</h1>
      <br />

      <div className="container">
        {!cinemas ? 
          <div className="hero is-fullheight title">
            { hasErr ? 
              <div className="hero-body">
                <div className="container has-text-centered">Something went wrong</div>
              </div> 
              : 
              <div className="hero-body">
                <div className="container has-text-centered">Loading</div>
              </div>
            }
          </div>
          :
          <div className="columns is-multiline">
            {cinemas.map(cinema => (
              <div key={cinema.id} className="column is-half-tablet is-one-third-desktop">
                <CinemaCard {...cinema} />
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default CinemaIndex