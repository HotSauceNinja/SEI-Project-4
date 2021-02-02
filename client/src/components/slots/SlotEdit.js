import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useForm from '../../utils/useForm'
import SlotForm from './SlotForm'
import { editSlot, getSingleSlot, deleteSlot } from './../lib/api'

function SlotEdit() {
  const { id } = useParams()
  const history = useHistory()
  const { formdata, setFormdata, errors, setErrors, handleChange } = useForm({
    cinema: '',
    startTime: '',
    endTime: '',
    film: ''
  })
  
  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleSlot(id)
      setFormdata(data)
    }
    getData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    console.log('Form data going in handlesubmit is: ', formdata)

    const slotToEdit = {
      ...formdata,
      cinema: formdata.cinema.id,
      film: (formdata.film === null) ? 
        null 
        : 
        (typeof formdata.film !== 'object') ? 
          formdata.film 
          : 
          formdata.film.id,
      scheduledBy: !formdata.scheduledBy ? null : formdata.scheduledBy.id
    }

    console.log('formdata coming out as slot to edit is: ', slotToEdit)


    try {
      await editSlot(id, slotToEdit)
      history.push('/schedule/')

    } catch (err) {
      setErrors(err.response.data)
    }
  }

  // * Handle slot delete
  const handleDelete = async () => {
    try {
      await deleteSlot(id)
      history.push('/schedule/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <SlotForm 
        formdata={formdata}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="form">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <p className="control">
              <button className="button is-danger is-centered" onClick={handleDelete}> Delete Scheduling Slot </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlotEdit