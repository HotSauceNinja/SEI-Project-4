import React from 'react'
import Select from 'react-select'

const genreSelectOptions = [
  { value: 1, label: 'Thriller' },
  { value: 2, label: 'Comedy' },
  { value: 3, label: 'Documentary' },
  { value: 4, label: 'Drama' },
  { value: 5, label: 'Family' },
  { value: 6, label: 'Horror' },
  { value: 7, label: 'Adventure' },
  { value: 8, label: 'Action' },
  { value: 9, label: 'Musical' },
  { value: 10, label: 'Sci Fi' },
  { value: 11, label: 'Animation' }
]

const sectionSelectOptions = [
  { value: 1, label: 'Galas' },
  { value: 2, label: 'Up and Coming' },
  { value: 3, label: 'Focus Country' },
  { value: 4, label: 'Family Time' },
  { value: 5, label: 'Late Night Thrills' },
  { value: 6, label: 'Immersive Pop Ups' }
]


function FilmForm({ handleChange, handleSubmit, formdata, errors }) {

  const handleMultiSelectionChange = (selected, name) => {
    const selectedOption = selected ? selected.map(item => item.value) : []
    handleChange({ target: { name, value: selectedOption } })
  }

  return (
    <>
      <form className="box column is-three-fifths is-offset-one-fifth" onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">

            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className='input'
                  placeholder="Title"
                  onChange={handleChange}
                  name="title"
                  value={formdata.title}
                />
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.title}</p>}

            <div className="field">
              <label className="label">Director</label>
              <div className="control">
                <input
                  className='input'
                  placeholder="Director"
                  onChange={handleChange}
                  name="director"
                  value={formdata.director}
                />
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.director}</p>}

            <div className="field">
              <label className="label">Year Released (YYYY)</label>
              <div className="control">
                <input
                  className='input'
                  placeholder="Year Released"
                  onChange={handleChange}
                  name="yearReleased"
                  type="number"
                  value={formdata.yearReleased}
                />
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.yearReleased}</p>}

            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                <input
                  className='input'
                  placeholder="Country"
                  onChange={handleChange}
                  name="country"
                  value={formdata.country}
                />
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.country}</p>}

            <div className="field">
              <label className="label">Genres</label>
              <div className="control">
                <Select
                  options={genreSelectOptions}
                  isMulti
                  onChange={selected => handleMultiSelectionChange(selected, 'genre')}
                />
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.genre}</p>}

          </div>

          <div className="column">
            <div className="field">
              <div className="field">
                <label className="label">Run Time (hh:mm:ss)</label>
                <div className="control">
                  <input
                    className='input'
                    placeholder="Run Time"
                    onChange={handleChange}
                    name="runTime"
                    value={formdata.runTime}
                  />
                </div>
              </div>
              {errors && <p className="help is-danger">{errors.runTime}</p>}

              <div className="field">
                <label className="label">Poster URL</label>
                <div className="control">
                  <input
                    className='input'
                    placeholder="Poster URL"
                    onChange={handleChange}
                    name="poster"
                    value={formdata.poster}
                  />
                </div>
              </div>
              {errors && <p className="help is-danger">{errors.poster}</p>}

              <div className="field">
                <label className="label">Distributor</label>
                <div className="control">
                  <input
                    className='input'
                    placeholder="Distributor"
                    onChange={handleChange}
                    name="distributor"
                    value={formdata.distributor}
                  />
                </div>
              </div>
              {errors && <p className="help is-danger">{errors.distributor}</p>}

              <div className="field">
                <label className="label">Film Format</label>
                <div className="select">
                  <select name="filmFormat" onChange={handleChange} value={formdata.filmFormat}>
                    <option value="" disabled></option>
                    <option value="16mm">16 mm</option>
                    <option value="35mm">35 mm</option>
                    <option value="70mm">70 mm</option>
                    <option value="DCP">DCP</option>
                    <option value="nonDCPDigital">Non DCP Digital</option>
                  </select>
                </div>
              </div>
              {errors && <p className="help is-danger">{errors.filmFormat}</p>}

              <div className="field">
                <label className="label">Section</label>
                <div className="control">
                  <Select
                    options={sectionSelectOptions}
                    isMulti
                    onChange={selected => handleMultiSelectionChange(selected, 'section')}
                  />
                </div>
              </div>

            </div> 
          </div>
        </div>

        <div className="field">
          <label className="label">Plot</label>
          <div className="control">
            <textarea
              className='textarea'
              placeholder="Plot"
              onChange={handleChange}
              name="plot"
              value={formdata.plot}
            />
          </div>
        </div>
        {errors && <p className="help is-danger">{errors.plot}</p>}

        <div className="field">
          <button type="submit" className="button">Add film</button>
        </div>

      </form>
    </>
  )
}

export default FilmForm