import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getAllSlots } from '../../lib/api'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss'

function SchedulingSlots(){

  const history = useHistory()
  const localizer = momentLocalizer(moment)
  const [slots, setSlots] = React.useState(null)
  const [hasErr, setHasErr] = React.useState(false)

  // * Get the array of scheduling slots objects
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllSlots()

        // * Sort all slots in chronological order
        const sortedData = data.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))

        setSlots(sortedData)
      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [])

  // * Format events array of objects for showing on calendar, or do nothing if slots are null
  const events = slots && slots.map(slot => { 
    return {
      id: slot.id,
      title: !slot.film ? 'Free slot' : slot.film.title,
      allDay: false,
      start: new Date(slot.startTime),
      end: new Date(slot.endTime),
      resource: slot.cinema.name
    }
  })

  function handleDoubleClick (event) {
    console.log('event is ', event)
    history.push(`/slots/${event.id}/edit/`)
  }

  return (
    <div className="section has-background-dark has-text-light">
      <div className="container"> 
        <br />     
        <div className="columns">
          <div className="column title has-text-centered has-text-info-light">Screening Schedule</div>

          <div className="column buttons is-one-fifth">
            <button className="button is-link">
              <Link to={'/slots/new/'} className="has-text-white"> Add Screening Slot </Link>
            </button>
          </div>
        </ div>

        {!slots ? // * Only render the calender if slots exist
          <div className="hero is-fullheight title">
            { hasErr ?
              <div className="hero-body">
                <div className="container has-text-centered">Something went wrong</div>
              </div> 
              : 
              <div className="hero-body">
                <div className="container has-text-centered">Loading</div>
              </div>
            }
          </div>
          :
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date(2021, 5, 14)}
            defaultView="week"
            style={{ height: '100vh' }}
            onDoubleClickEvent={handleDoubleClick}
          />
        }
      </div>
    </div>
  )
}
export default SchedulingSlots