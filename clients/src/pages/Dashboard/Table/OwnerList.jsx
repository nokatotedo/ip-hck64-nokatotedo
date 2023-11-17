/* eslint-disable react/prop-types */
import { useContext } from "react"
import NotificationContext from "../../../contexts/NotificationContext"
import { Link } from "react-router-dom"
import axios from "axios"

export default function OwnerList({ list, index }) {
  const notification = useContext(NotificationContext)

  async function offLed() {
    try {
      await axios({
        method: "patch",
        url: `https://kosth-server.nokatotedo.my.id/my/kosts/${list.id}`,
        headers: {
          "Authorization": "Bearer " + localStorage.access_token
        },
        data: {
          status: "off"
        }
      })

      notification.setNotification({
        type: 'error',
        message: "Successfully offline your kost."
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  async function onLed() {
    try {
      await axios({
        method: "patch",
        url: `https://kosth-server.nokatotedo.my.id/my/kosts/${list.id}`,
        headers: {
          "Authorization": "Bearer " + localStorage.access_token
        },
        data: {
          status: "on"
        }
      })

      notification.setNotification({
        type: 'success',
        message: "Successfully online your kost."
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  async function deleteRooms() {
    try {
      await axios({
        method: "DELETE",
        url:`https://kosth-server.nokatotedo.my.id/my/kosts/${list.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      notification.setNotification({
        type: 'error',
        message: "Successfully deleted your kost."
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <tr>
      <td>{ index+1 }</td>
      <td>{list.name}</td>
      <td className="info" onClick={() => {
        list.status === "off" ? offLed() : onLed()
      }}><span className={list?.status === "off" ? "nonactive" : "active"}>{list.status}</span></td>
      <td className="action">
        <Link to={`edit/${list.id}`}id='btn-edit'>Edit</Link>
        <Link to={`details/${list.id}`} id='btn-details'>Details</Link>
        <Link to="/dashboard" id='btn-delete' onClick={() => {
          deleteRooms()
        }}>Delete</Link>
      </td>
    </tr>
  )
}