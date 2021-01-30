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
          <h1 className="title has-text-centered">{film.title} ({film.yearReleased})</h1>
          <div className="columns">
            <div className="column is-one-third">
              <img src={film.poster} alt={film.title} className="image" />              
            </div>

            <div className="card-content">
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
              </div>
            </div>
          </div>

          <div>
            Screening Slots / map through:
            { !film.slots ? 
              <div>Loading</div>
              :
              <div>        
                { film.slots.length ?
                  <div> 
                    {film.slots.map(slot => (
                      <div key={slot.id}> 
                        {slot.cinema}: {slot.startTime} - {slot.endTime}
                      </div>
                    ))}
                  </div>
                  :
                  <div> no length </div>
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
