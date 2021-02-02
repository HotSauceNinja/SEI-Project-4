import React from 'react'
import { useHistory } from 'react-router-dom'
import useForm from '../../utils/useForm'
import { createSlot } from '../../lib/api'
import SlotForm from './SlotForm'

function SlotNew() {
  const history = useHistory()
  const { formdata, handleChange, errors, setErrors } = useForm({
    cinema: '',
    startTime: '',
    endTime: '',
    film: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await createSlot(formdata)
      console.log('slot created', data)

      history.push('/schedule/')

    } catch (err) {
      // console.log(err.response.data)
      setErrors(err.response.data)

    }
  }
  console.log('errors are', errors)


  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <SlotForm
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

export default SlotNew