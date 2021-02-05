import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleUser } from '../../lib/api'

function UserShow() {

  // const [user, setUser] = React.useState(null)
  const { id } = useParams()

  //*Get User profile
  React.useEffect(() => {
    const getData = async () => {
      try {
        await getSingleUser(id)
        // console.log('user data:', data )
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  return (
    <div>User page goes here</div>
  )
}

export default UserShow