import React from 'react'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'
import { useHistory } from 'react-router-dom'
import useForm from '../../utils/useForm'

function Login(){

  const { formdata, handleChange } = useForm({
    email: '',
    password: ''
  })

  const history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      console.log('form ', formdata)
      
      const { data } = await loginUser(formdata)
      console.log(data)
      setToken(data.token)
      history.push('/')

    } catch (err) {
      console.log('error data :', err.response.data)
    }

    console.log('submitting :', formdata)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form className="box column is-half is-offset-one-quarter" onSubmit={handleSubmit}>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formdata.email}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formdata.password}
                />
              </div>
            </div>

            <div className="field">
              <button type="submit" className="button">Login</button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default Login