/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import NotificationContext from "../contexts/NotificationContext"
import axios from "axios"
import "./styles/Dashboard.css"
import { Link, Outlet } from 'react-router-dom'

export default function Dashboard() {
  const notification = useContext(NotificationContext)
  const [user, setUser] = useState()

  useEffect(() => {
    getUser()
  }, [notification.notification])

  async function getUser() {
    try {
      const { data } = await axios({
        url: "https://kosth-server.nokatotedo.my.id/my",
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      setUser(data)
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <>
      <section id="dashboard">
        <div id="profiles">
          <img src={user?.profiles.imgUrl} alt={user?.profiles.name} />
          <div id="profiles-description">
            <h4>{user?.profiles.name}</h4>
            <p>{user?.email}</p>
            <Link to="edit"><div id="btn-edit">Edit</div></Link>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  )
}