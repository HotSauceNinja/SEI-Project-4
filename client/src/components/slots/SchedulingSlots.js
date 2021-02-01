import React from 'react'
import { getAllSlots } from '../lib/api'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss'

function SchedulingSlots(){

  const localizer = momentLocalizer(moment)
  const [slots, setSlots] = React.useState(null)
  // const [hasErr, setHasErr] = React.useState(false)

  // * Gets the array of scheduling slots objects
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllSlots()

        const sortedData = data.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))
        console.log('sorted data *** ', sortedData)

        setSlots(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const events = slots && slots.map(slot => { // * if the slots are null, this will just be false, but will format the events correctly where the slots are here

    return {
      id: slot.id,
      title: !slot.film ? 'Free slot' : slot.film.title,
      allDay: false,
      start: new Date(slot.startTime),
      end: new Date(slot.endTime),
      resource: slot.cinema.name
    }
  })

  console.log('formatted slots are: ', events)
  return (
    <div className="container">
      {slots ? // * only render the calender if slots exist
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date(2021, 5, 14)}
          defaultView="week"
          style={{ height: '100vh' }}
        />
        : <p>..loading</p>
      }
    </div>
  )
}
export default SchedulingSlots