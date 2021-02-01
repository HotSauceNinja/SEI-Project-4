import React from 'react'
import { getAllSlots } from '../lib/api'

function SlotIndex(){
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

  // const cinemaShowingSlots = !slots.cinema ? null : console.log('not')

  // console.log('Filmhouse: ', cinemaShowingSlots)


  return (
    <div className="section">
      <div className="title has-text-centered">Scheduling Slots</div>
      <div className="container">
        {!slots ?
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
          <div className="container">
            {slots.map(slot => (
              <div key={slot.id} className="column">{slot.startTime} - {slot.endTime}
                <div>
                  {slot.cinema.name}
                </div> 
              </div>
            ))}
          </div>
        }
      
      </div>
    </div>
  )
}

export default SlotIndex