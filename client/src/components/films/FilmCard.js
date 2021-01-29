import React from 'react'
import { Link } from 'react-router-dom'

function FilmCard({ id,title, yearReleased, director, poster, country, genre, section }) {
  return (
    <div className="card">
      <Link to={`/films/${id}`} >
        <div className="container">

          <div className="card-header">
            <div className="card-header-title is-centered">{title} ({yearReleased}) </div>
          </div>

          <div className="columns is-mobile">
            <figure className="card-image column">
              <img src={poster} alt={title} className="image" />
            </figure>
          
            <div className="card-content column">
              <div className="container mr-3" >
                <div>Dir: {director}</div>
                <p>{country}</p>                
                <br />
                { !genre ? 
                  <div>Loading</div>
                  :
                  <div>            
                    {genre.map(type => (
                      <span key={type.id}> {type.name} | </span>
                    ))}                
                  </div>
                }
                <br />

                { !section ? 
                  <div>Loading</div>
                  :
                  <div>        
                    { !section.length ? 
                      <div>Not assigned yet</div>
                      :
                      section.map(selected => (
                        <span key={selected.id}> {selected.name} </span>
                      ))           
                    }  
                    
                  </div>
                }
                <br />
                <div>

                </div>
              </div>
            </div>
            
        
          </div>
          
        </div>        
      </Link>
    </div>
  )
}

export default FilmCard