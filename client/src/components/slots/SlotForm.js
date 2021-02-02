import React from 'react'
// import DateTime from 'react-datetime'
import Select from 'react-select'
// import Moment from 'moment'

import { getAllFilms } from '../lib/api'

function SlotForm({ handleChange, handleSubmit, formdata, errors }) {

  const [films, setFilms] = React.useState(null)
  // const [hasErr, setHasErr] = React.useState(false)

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


  // const [startTime, onStartTimeChange] = useState(new Date())
  // const [endTime, onEndTimeChange] = useState(new Date())

  // console.log('startTime', startTime)
  // console.log('endTime', endTime)

  // const [startDate, setStartDate] = useState(Moment().format('yyyy-MM-dd hh:mm'))

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
            {errors && <p className="help is-danger">{errors.cinema}</p>}

            <div className="field">
              <label className="label">Start Time</label>
              <div className="control">
                <input
                  className={`input ${errors.startTime ? 'is-danger' : ''}`}
                  placeholder="Start Date and Time"
                  onChange={handleChange}
                  name="startTime"
                  value={formdata.startTime}
                />
                {/* <DateTime
                  value={startDate}
                  dateFormat="yyyy-MM-dd hh:mm"                 
                  timeFormat="HH:mm"
                  closeOnSelect={true}
                  onChange={date => setStartDate(date)}


                /> */}
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.startTime}</p>}

            <div className="field">
              <label className="label">End Time</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="End Date and Time"
                  onChange={handleChange}
                  name="endTime"
                  // value={formdata.endTime}
                />
                {/* <DateTimePicker
                  onChange={onEndTimeChange}
                  value={endTime}
                  name="endTime"
                /> */}
              </div>
            </div>

            <div className="field">
              <label className="label">Title dropdown options</label>
              <div className="control">
                <Select
                  options={filmSelectOptions}
                  onChange={selected => handleSelectChange(selected, 'film')}
                  placeholder="Select an option or leave slot empty for now"
                />
              </div>
            </div>

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