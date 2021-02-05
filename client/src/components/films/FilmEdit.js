import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleFilm, editFilm } from '../../lib/api'
import useForm from '../../utils/useForm'

import FilmForm from './FilmForm'

function FilmEdit() {
  const history = useHistory()
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
    const filmToEdit = {
      ...formdata,
      creator: formdata.creator.id,
      genre: formdata.genre.map(genre => {
        if (typeof genre === 'object') { // * we can see if the genre was an object
          return genre.id // * in which case return its id
        }
        return genre // * or it was already a number, so just return it back as is
      }),
      section: formdata.section.map(section => {
        if (typeof section === 'object') { // * we can see if the genre was an object
          return section.id // * in which case return its id
        }
        return section // * or it was already a number, so just return it back as is
      })
    }

    // console.log('updated film to send', filmToEdit)

    try {
      await editFilm(id, filmToEdit)
      // console.log(response)
      history.push(`/films/${id}/`)

    } catch (err) {
      // console.log(err)
      setErrors(err.response.data)
    }
  }

  return (
    <section className="section has-background-dark">
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