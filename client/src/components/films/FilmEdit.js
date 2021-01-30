import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleFilm, editFilm } from '../lib/api'
import useForm from '../../utils/useForm'

import FilmForm from './FilmForm'

function FilmEdit() {

  const { id } = useParams()
  const { formdata, errors, setErrors, handleChange, setFormdata } = useForm({
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

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleFilm(id)
      setFormdata(data)
    }
    getData()
  }, [id, setFormdata])

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await editFilm(id, formdata)
      console.log('data is', formdata)
      history.pushState(`/films/${id}/`)

    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <FilmForm
          formdata={formdata}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default FilmEdit