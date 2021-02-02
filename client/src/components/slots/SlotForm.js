import React from 'react'
// import DateTime from 'react-datetime'
import Select from 'react-select'
// import Moment from 'moment'

import { getAllFilms } from '../../lib/api'

function SlotForm({ handleChange, handleSubmit, formdata, errors }) {

  const [films, setFilms] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllFilms()
        setFilms(data)

      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // List all films user can select from for drop box
  const filmSelectOptions = films && films.map(film => {
    return {
      label: film.title,
      value: film.id
    }
  })

  const handleSelectChange = (selected, name) => {
    const selectedItem = selected ? selected.value : null
    console.log('selected item is ', selectedItem)
    handleChange({ target: { name, value: selectedItem } })
  }

  return (
    <>
      <form className="box column is-three-fifths is-offset-one-fifth" onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">

            <div className="field">
              <label className="label">Cinema Dropdown</label>
              <div className="select">
                <select name="cinema" onChange={handleChange} value={formdata.cinema}>
                  <option value="" disabled></option>
                  <option value="1">Filmhouse</option>
                  <option value="2">Odeon Lothian Road</option>
                  <option value="3">Cineworld Fountain Park</option>
                  <option value="4">VUE Omni</option>
                  <option value="5">Cameo</option>
                  <option value="6">Dominion</option>
                </select>
              </div>
            </div>
            {errors.cinema && <p className="help is-danger">{errors.cinema}</p>}

            <div className="field">
              <label className="label">Start Time (YYYY-MM-DD hh:mm)   </label>
              <div className="control">
                <input
                  className={`input ${errors.startTime ? 'is-danger' : ''}`}
                  placeholder="Start Date and Time"
                  onChange={handleChange}
                  name="startTime"
                  value={formdata.startTime}
                />
              </div>
            </div>
            {errors.startTime && <p className="help is-danger">Start Time may not be null or in the past</p>}

            <div className="field">
              <label className="label">End Time (YYYY-MM-DD hh:mm)</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="End Date and Time"
                  onChange={handleChange}
                  name="endTime"
                  value={formdata.endTime}
                />
              </div>
            </div>
            {errors.endTime && <p className="help is-danger">{errors.endTime}</p>}

            <div className="field">
              <label className="label">Title dropdown options</label>
              <div className="control">
                <Select
                  options={filmSelectOptions}
                  onChange={selected => handleSelectChange(selected, 'film')}
                  placeholder="Select a new title or leave as is"
                  value={formdata.selected}
                />
              </div>
            </div>
            {errors.film && <p className="help is-danger">{errors.film}</p>}

          </div>
        </div>
        <div className="field">
          <button type="submit" className="button">Submit</button>
        </div>

      </form>
    </>
  )
}

export default SlotForm