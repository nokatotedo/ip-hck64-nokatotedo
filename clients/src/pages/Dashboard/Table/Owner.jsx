/* eslint-disable react-hooks/exhaustive-deps */
import NotificationContext from '../../../contexts/NotificationContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import OwnerList from './OwnerList'
import { Link } from 'react-router-dom'

export default function Owner() {
  const notification = useContext(NotificationContext)
  const [myKosts, setMyKosts] = useState(null)

  useEffect(() => {
    getMyKosts()
  }, [notification.notification])

  async function getMyKosts() {
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/my/kosts',
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      setMyKosts(data)
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }
  
  return (
    <>
      <h1>Kost List</h1>
      <div id="btn-create">
        <Link to="create">Create Kost</Link>
      </div>
      <div className='dashboard-table' id='owner'>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kost Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myKosts && myKosts.map((myKost, i) => { return <OwnerList list={myKost} key={myKost.id} index={i} /> })}
          </tbody>
        </table>
      </div>
    </>
  )
}