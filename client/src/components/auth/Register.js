import React from 'react'
import { registerUser } from '../lib/api'
import { useHistory } from 'react-router-dom'

function Register(){

  const [formdata, setFormdata] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    username: '',
    profilePhoto: ''
  })

  const history = useHistory()
  console.log(history)

  const handleChange = event => {
    setFormdata({ ... formdata, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await registerUser(formdata)
      history.push('/login/')

    } catch (err) {
      console.log('error data :', err.response.data)
    }

    console.log('submitting :', formdata)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form className="column is-half is-offset-one-quarter" onSubmit={handleSubmit}>

            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input 
                  className="input"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formdata.firstName}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input 
                  className="input"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formdata.lastName}
                />
              </div>
            </div>

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
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formdata.password}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input 
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  onChange={handleChange}
                  name="passwordConfirmation"
                  value={formdata.passwordConfirmation}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input 
                  className="input"
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                  value={formdata.username}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Profile Photo</label>
              <div className="control">
                <input 
                  className="input"
                  placeholder="Photo URL"
                  onChange={handleChange}
                  name="profilePhoto"
                  value={formdata.profilePhoto}
                />
              </div>
            </div>

            <div className="field">
              <button type="submit" className="button">Register</button>
            </div>
          </form>
        </div>        
      </div>
    </section>
  )
}

export default Register