import React from 'react'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import useForm from '../../utils/useForm'

function Register(){

  const history = useHistory()

  const { formdata, handleChange, errors, setErrors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    username: '',
    profilePhoto: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await registerUser(formdata)
      history.push('/login/')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <section className="section has-background-dark">
      <div className="container">
        <div className="columns">
          <form className="column is-half is-offset-one-quarter " onSubmit={handleSubmit}>

            <div className="field">
              <label className="label has-text-info">First Name</label>
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
            {errors && <p className="help is-danger">{errors.firstName}</p>}

            <div className="field has-text-info">
              <label className="label has-text-info">Last Name</label>
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
            {errors && <p className="help is-danger">{errors.lastName}</p>}

            <div className="field">
              <label className="label has-text-info">Email</label>
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
            {errors && <p className="help is-danger">{errors.email}</p>}

            <div className="field">
              <label className="label has-text-info">Password</label>
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
            {errors && <p className="help is-danger">{errors.password}</p>}

            <div className="field">
              <label className="label has-text-info">Password Confirmation</label>
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
            {errors && <p className="help is-danger">{errors.passwordConfirmation}</p>}

            <div className="field">
              <label className="label has-text-info">Username</label>
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
            {errors && <p className="help is-danger">{errors.username}</p>}

            <div className="field">
              <label className="label has-text-info">Profile Photo</label>
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
            {errors && <p className="help is-danger">{errors.profilePhoto}</p>}
            <br />

            <div className="field">
              <button type="submit" className="button is-info has-text-info-light">Register</button>
            </div>
          </form>
        </div>        
      </div>
    </section>
  )
}

export default Register