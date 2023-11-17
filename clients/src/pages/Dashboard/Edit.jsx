/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import NotificationContext from "../../contexts/NotificationContext";
import axios from "axios";
import '../styles/DashboardEdit.css'
import generateFormInput from "../../helpers/generateFormInput";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const notification = useContext(NotificationContext)
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    getUser()
  }, [])

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

  async function editUser(input) {
    try {
      await axios({
        method: "PUT",
        url: "https://kosth-server.nokatotedo.my.id/my",
        data: input,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      navigate('/dashboard')
      notification.setNotification({
        type: 'success',
        message: "Successfully edit user."
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <section id="dashboard-edit">
      <form onSubmit={(e) => {
        e.preventDefault()
        const input = generateFormInput(e)
        editUser(input)
      }}>
        <h1>Update</h1>
        <div className="input">
          <i className="fa-solid fa-user"></i>
          <input type="text" placeholder="Name" defaultValue={user?.profiles.name} id="name"/>
        </div>
        <div className="input">
          <i className="fa-solid fa-phone"></i>
          <input type="text" placeholder="Phone Number" defaultValue={user?.profiles.phoneNumber} id="phoneNumber"/>
        </div>
        <div className="input">
          <i className="fa-solid fa-image"></i>
          <input type="text" placeholder="Image URL" defaultValue={user?.profiles.imgUrl} id="imgUrl"/>
        </div>
        <Button color={"primary"} type={"submit"} value={"Edit"}/>
      </form>
    </section>
  )
}