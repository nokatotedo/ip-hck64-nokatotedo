
/* eslint-disable react/no-unescaped-entities */
import { useContext } from 'react'
import generateFormInput from '../helpers/generateFormInput'
import Button from '../components/Button'
import NotificationContext from '../contexts/NotificationContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const notification = useContext(NotificationContext)
  const navigate = useNavigate()

  async function register(input) {
    try {
      await axios({
        method: 'POST',
        url: 'https://kosth-server.nokatotedo.my.id/register',
        data: input
      })

      navigate('/login')
      notification.setNotification({
        type: 'success',
        message: 'Successfully register'
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <>
      <section id="login">
        <div id="login-left">
          <form onSubmit={(e) => {
            e.preventDefault()
            const input = generateFormInput(e)
            register(input)
          }}>
            <h1>Register</h1>
            <div className="input">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder='Email' id='email' />
            </div>
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder='Password' id='password' />
            </div>
            <Button value={"Register"} type={"submit"} color={"primary"}/>
            <div id="another-form">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
        <div id="login-right">
          <img src="/login-background.svg" alt="Login Background" />
        </div>
      </section>
    </>
  )
}