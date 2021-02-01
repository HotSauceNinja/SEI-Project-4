import React from 'react'
import { getAllSlots } from '../lib/api'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss'
// import 'react-big-calendar/lib/addons/dragAndDrop/withDragAndDrop'

function SchedulingSlots(){

  const [slots, setSlots] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)

  // * Gets the array of scheduling slots objects 
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

  const localizer = momentLocalizer(moment)

  // * Creates new object setting slots in format required to be displayed in the calendar
  if (slots) {
    console.log(slots.title)
    const formattedSlots = slots.map(slot => {
      return {
        id: slot.id,
        title: slot.film,
        allDay: false,
        start: new Date(slot.startTime),
        end: new Date(slot.endTime),
        resource: slot.cinema.name
      }
    })

    console.log('formattedSlots' ,formattedSlots)
  }
  

  // The events object which displays events on the calendar
  const events = [{
    id: 0,
    title: 'No slot allocated',
    allDay: false,
    start: new Date(2021, 6, 17, 18, 0, 0),
    end: new Date(2021, 6, 17, 20, 30, 0)
  }]
    

  return (
    <div className="container">

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date(2021, 6, 17)}
        defaultView="week"
        style={{ height: '100vh' }}
      />
    </div>
  )
}

export default SchedulingSlots