import React from 'react'

function FilmNew() {


  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form className="box column is-three-fifths is-offset-one-fifth">
            <div className="columns">
              <div className="column">

                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Title"
                      // onChange={handleChange}
                      name="title"
                      // value={formdata.title}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Director</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Director"
                      // onChange={handleChange}
                      name="director"
                      // value={formdata.director}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Year Released (YYYY)</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Year Released"
                      // onChange={handleChange}
                      name="yearReleased"
                      // value={formdata.yearReleased}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Country</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Country"
                      // onChange={handleChange}
                      name="country"
                      // value={formdata.country}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Run Time (hh:mm:ss)</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Run Time"
                      // onChange={handleChange}
                      name="runTime"
                      // value={formdata.runTime}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Poster URL</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Poster URL"
                      // onChange={handleChange}
                      name="poster"
                      // value={formdata.poster}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Distributor</label>
                  <div className="control">
                    <input
                      className="input"
                      placeholder="Distributor"
                      // onChange={handleChange}
                      name="distributor"
                      // value={formdata.distributor}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Film Format</label>
                  <div className="control">
                    <div className="select">
                      <select>
                        <option>Select dropdown</option>
                        <option>35 mm</option>
                        <option>16 mm</option>
                        <option>70 mm</option>
                        <option>DCP</option>
                        <option>Non-DCP Digital</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">

                <div className="field">
                  <label className="label">Genre(s)</label>
                  <div className="control">
                    <div className="select is-multiple">
                      <select multiple size="10">
                        <option value="thriller">Thriller</option>
                        <option value="comedy">Comedy</option>
                        <option value="documentary">Documentary</option>
                        <option value="drama">Drama</option>
                        <option value="family">Family</option>
                        <option value="horror">Horror</option>
                        <option value="adventure">Adventure</option>
                        <option value="action">Action</option>
                        <option value="musical">Musical</option>
                        <option value="sciFi">Sci Fi</option>
                        <option value="animation">Animation</option>
                      </select>
                      <p className="help is-success">Ctrl + click for multi select</p>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Section</label>
                  <div className="control">
                    <div className="select is-multiple">
                      <select multiple size="6">
                        <option value="galas">Galas</option>
                        <option value="upAndComing">Up and Coming</option>
                        <option value="focusCountry">Focus Country</option>
                        <option value="familyTime">Family Time</option>
                        <option value="lateNightThrills">Late Night Thrills</option>
                        <option value="immersivePopUps">Immersive Pop Ups</option>
                      </select>
                      <p className="help is-danger">Only choose if section was assigned</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div className="field">
              <label className="label">Plot</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Plot"
                  // onChange={handleChange}
                  name="plot"
                  // value={formdata.plot}
                />
              </div>
            </div>

            <div className="field">
              <button type="submit" className="button">Add film</button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default FilmNew