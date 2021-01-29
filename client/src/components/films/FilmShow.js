import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleFilm } from '../lib/api'

function FilmShow() {

  const [film, setFilm] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)
  const { id } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleFilm(id)
        setFilm(data)

      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [id])

  console.log('film is ', film)
  console.log(hasErr)

  return (
    <div className="container">
      {!film ? 
        <div className="title">
          { hasErr ? 
            <div>
              <div className="container has-text-centered">Something went wrong</div>
            </div> 
            : 
            <div>
              <div className="container has-text-centered">Loading</div>
            </div>
          }
        </div>
        :
        <div>
          <h1 className="title">{film.title}</h1>
          
        </div>
      }
    </div>
  )
}

export default FilmShow