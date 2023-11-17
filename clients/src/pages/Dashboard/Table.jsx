import { useContext, useEffect, useState } from "react"
import NotificationContext from "../../contexts/NotificationContext"
import '../styles/DashboardTable.css'
import axios from "axios"
import Owner from "./Table/Owner"
import Client from "./Table/Client"

export default function Table() {
  const [role, setRole] = useState()
  const notification = useContext(NotificationContext)

  useEffect(() => {
    getUserRole()
  }, [])

  async function getUserRole() {
    try {
      const { data } = await axios({
        url: "https://kosth-server.nokatotedo.my.id/my",
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      setRole(data.role)
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <section id="dashboard-table">
      {role ? role === "owner" ? <Owner /> : <Client /> : ""}
    </section>
  )
}