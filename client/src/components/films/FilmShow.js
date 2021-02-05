import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { deleteFilm, getSingleFilm } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'

function FilmShow() {
  const history = useHistory()

  // checks if user is authenticated (has valid token)
  const isLoggedIn = isAuthenticated()

  const [film, setFilm] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)
  const { id } = useParams()

  // * Get a film
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
    // keep track of film id, if it changes request a new film
  }, [id])

  
  // * Handle film delete
  const handleDelete = async () => {
    try {
      await deleteFilm(id)
      history.push('/films/')
    } catch (err) {
      console.log(err)
      // setHasErr(err)
    }
  }

  // console.log('film data ', film)

  return (
    <div className="section has-background-dark">
      {!film ? 
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
          <h1 className="title has-text-centered has-text-info">{film.title} ({film.yearReleased})</h1>
          <div className="columns">
            <div className="column is-one-third">
              <img src={film.poster} alt={film.title} className="image" />              
            </div>

            <div className="card-content has-text-info-light">
              <div className="container mr-3" >
                <div>Dir: {film.director}</div>                
                { !film.genre ? 
                  <div>Loading</div>
                  :
                  <div>Genre:            
                    {film.genre.map(type => (
                      <span key={type.id}> {type.name} </span>
                    ))}                
                  </div>
                }
                <br />
                <p>{film.plot}</p>
                <br />
                <p>Run Time: {film.runTime}</p> 
                <p>Film Format: {film.filmFormat}</p>
                <p>Countries: {film.country}</p>  
                <p>Distributor: {film.distributor}</p>
                <br />
                <div>Section:
                  { !film.section ? 
                    <div>Loading</div>
                    :
                    <span>        
                      { !film.section.length ? 
                        <div>Not assigned yet</div>
                        :
                        film.section.map(selected => (
                          <span key={selected.id}> {selected.name} </span>
                        ))           
                      }  
                    </span>
                  }
                </div>
                <br />
                { isOwner(film.creator.id) &&
                  <div className="field is-grouped is-right">
                    <p className="control">
                      <button className="button is-info is-outlined">
                        <Link to={`/films/${id}/edit/`}> Edit Film </Link>
                      </button>
                    </p>
                    <p className="control">
                      <button className="button is-danger is-outlined" onClick={handleDelete}> Delete Film </button>
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="has-text-info">
            Screening Slots:
            { !film.slots ? 
              <div>Loading</div>
              :
              <div>        
                { film.slots.length ?
                  <div> 
                    {film.slots.map(slot => (
                      <div key={slot.id} > 
                        <div className="has-text-white">
                          {slot.cinema}: {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                  :
                  <div> 
                    {isLoggedIn ?
                      <Link to={'/slots/new/'}>Click here to create a screening slot</Link>
                      :
                      <Link to="/login/" className="has-text-white">Click here to create a screening slot</Link>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default FilmShow
