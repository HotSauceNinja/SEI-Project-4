import React from 'react'
import { getAllCinemas } from '../../lib/api'

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
      <h1>Cinemas</h1>
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
          <div>Show em</div>
        }
      </div>
    </div>
  )
}

export default CinemaIndex