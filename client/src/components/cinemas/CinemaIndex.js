import React from 'react'
import { getAllCinemas } from '../../lib/api'

function CinemaIndex() {

  const [cinemas, setCinemas] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getAllCinemas()
      setCinemas(data)
    }

    getData()
  }, [])

  console.log('cinemas', cinemas)


  return (
    <div className="container">
      <h1>Cinemas</h1>
      <div></div>
    </div>
  )
}

export default CinemaIndex