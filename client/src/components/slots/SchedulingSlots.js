import React from 'react'
import { getAllSlots } from '../lib/api'

// import SlotsIndex from './SlotsIndex'

function SchedulingSlots(){

  const [slots, setSlots] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllSlots()
        setSlots(data)

      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [])

  console.log('slots are: ', slots)
  console.log('has error: ', hasErr)
  
  return (
    <div className="container">
      
    </div>
  )
}

export default SchedulingSlots