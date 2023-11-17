/* eslint-disable react/prop-types */
import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"
import axios from "axios"
import './styles/Card.css'

export default function Card({ kost }) {
  const notification = useContext(NotificationContext)

  async function buyKost() {
    try {
      const user = await axios({
        url: 'http://localhost:3000/my',
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      const data = await axios({
        method: 'POST',
        url: `http://localhost:3000/rent/${kost.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        },
        data: {
          price: kost.price,
          item_name: kost.name,
          client_name: user.data.profiles.name,
          client_email: user.data.email,
          client_phone: user.data.profiles.phoneNumber
        }
      })

      window.snap.pay(data.data)
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }
  return (
    <div className="card">
      <p>{kost.name}</p>
      <p>{kost.price}</p>
      {kost.status === "on" ? <>
        <p>Unavailable</p>
      </> : <>
        <a href="#" onClick={() => {
          buyKost()
        }}>Buy</a>
      </>}
    </div>
  )
}