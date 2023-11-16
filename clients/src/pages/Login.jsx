/* eslint-disable react/no-unescaped-entities */
import { useContext } from 'react'
import generateFormInput from '../helpers/generateFormInput'
import Button from '../components/Button'
import './styles/Login.css'
import NotificationContext from '../contexts/NotificationContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const notification = useContext(NotificationContext)
  const navigate = useNavigate()

  const hookGoogle = useGoogleLogin({
    onSuccess: token =>  {
      getInfoGoogle(token)
    }
  })

  async function login(input) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: input
      })

      localStorage.access_token = data.access_token
      navigate('/')
      notification.setNotification({
        type: 'success',
        message: 'Successfully login'
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  async function getInfoGoogle(input) {
    try {
      const { data } = await axios({
        method: "GET",
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: {
          Authorization: `Bearer ` + input.access_token
        }
      })

      loginGoogle(data)
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  async function loginGoogle(input) {
    try {
      const { data } = await axios({
        method: "POST",
        url: 'http://localhost:3000/login-google',
        data: input
      })
      
      localStorage.access_token = data.access_token
      navigate('/')
      notification.setNotification({
        type: 'success',
        message: 'Successfully login'
      })
    } catch (error) {
      console.log(error)
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
            login(input)
          }}>
            <h1>Login</h1>
            <div className="input">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder='Email' id='email' />
            </div>
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder='Password' id='password' />
            </div>
            <Button value={"Login"} type={"submit"} color={"primary"}/>
            <p id='text-or'>OR</p>
            <a href="#" id='btn-google' onClick={() => hookGoogle()}>
              <i className="fa-brands fa-google"></i>
              <p>Login</p>
            </a>
            <div id="another-form">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
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