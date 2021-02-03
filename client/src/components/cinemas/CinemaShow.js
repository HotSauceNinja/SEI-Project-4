import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleCinema } from '../../lib/api'
import CinemaIndex from './CinemaIndex'
import CinemaCard from './CinemaCard'

function CinemaShow() {

  const [cinema, setCinema] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)

  const { id } = useParams()

  // * Get one Cinema
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleCinema(id)
        setCinema(data)

      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [id])

  console.log(cinema)

  return (
    <div className="section has-background-dark">
      { !cinema ? 
        <div className="title has-text-info-light">
          { hasErr ? 
            <div>
              <div className="container has-text-centered has-text-info-light">Something went wrong</div>
            </div> 
            : 
            <div>
              <div className="container has-text-centered has-text-info-light">Loading</div>
            </div>
          }
        </div>
        :
        <div>
          <h1 className="title has-text-centered has-text-info-light">Cinemas</h1>
          <div className="columns">
            <div className="column is-one-third">
              <CinemaIndex />
            </div>
            <div className="column is-two-thirds">
              <CinemaCard {...cinema} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CinemaShow