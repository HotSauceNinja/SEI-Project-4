import React from 'react'

function useForm(initialState) {

  const [formdata, setFormData] = React.useState(initialState)

  const handleChange = event => {
    setFormData({ ... formdata, [event.target.name]: event.target.value })
  }

  return {
    formdata,
    handleChange
  }
}

export default useForm