import React from 'react'
import { getAllFilms } from '../lib/api'
import FilmCard from '../films/FilmCard'
import { Link } from 'react-router-dom'

function FilmIndex() {

  const [films, setFilms] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllFilms()
        setFilms(data)

      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [])

  return (
    <div className="container">
      <h1 className="title has-text-centered">Films</h1>
      <br />

      <div className="columns title has-text-centered">
        <span className="column is-one-third">
          <Link to="/films/new/" className="button">Add new film</Link>
        </span>
        <span className="column">Filter films goes here</span>
      </div>

      <div className="container">
        {!films ? 
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
          <div className="columns is-multiline is-mobile">
            {films.map(film => (
              <div key={film.id} className="column is-half-mobile is-half-tablet is-one-third-desktop">
                <FilmCard {...film} />
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default FilmIndex