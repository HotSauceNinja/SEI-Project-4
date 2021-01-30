import React from 'react'
import { useHistory } from 'react-router-dom'
import useForm from '../../utils/useForm'
import { createFilm } from '../lib/api'
import FilmForm from './FilmForm'

function FilmNew() {

  const history = useHistory()

  const { formdata, handleChange, errors, setErrors  } = useForm({
    title: '',
    director: '',
    yearReleased: '',
    country: '',
    runTime: '',
    poster: '',
    distributor: '',
    filmFormat: '',
    genre: [],
    section: [],
    plot: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await createFilm(formdata)
      history.push(`/films/${data.id}/`)
    } catch (err) {
      setErrors(err.response.data)
      console.log('error data :', err.response.data)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <FilmForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formdata={formdata}
            errors={errors}
          />
        </div>
      </div>
    </section>
  )
}

export default FilmNew