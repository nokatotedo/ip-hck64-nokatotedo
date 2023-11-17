
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react'
import generateFormInput from '../helpers/generateFormInput'
import Button from '../components/Button'
import NotificationContext from '../contexts/NotificationContext'
import axios from 'axios'
import './styles/Form.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function Form() {
  const notification = useContext(NotificationContext)
  const [list, setList] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if(id) {
      getKostById()
    }
  }, [])

  async function submit(input) {
    try {
      await axios({
        method: list ? 'PUT' : 'POST',
        url: list ? `http://localhost:3000/my/kosts/${list.id}` : 'http://localhost:3000/my/kosts',
        data: input,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      navigate('/dashboard')
      notification.setNotification({
        type: 'success',
        message: list ? 'Successfully edit kost' : 'Successfully create kost'
      })
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  async function getKostById() {
    try {
      const { data } = await axios({
        url: `http://localhost:3000/kosts/${id}`
      })

      setSelected(data.slot)
      setList(data)
    } catch (error) {
      navigate('/dasahboard/create')
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <>
      <section id="create">
        <div id="create-left">
          <form onSubmit={(e) => {
            e.preventDefault()
            const input = generateFormInput(e)
            submit(input)
          }}>
            <h1>{list ? "Edit" : "Create"}</h1>
            <div className="input">
              <input type="text" placeholder='Name' id='name' defaultValue={list?.name}/>
            </div>
            <div className="input">
              <input type="text" placeholder='Address' id='address' defaultValue={list?.address}/>
            </div>
            <div className="input">
              <input type="text" placeholder='Description' id='description' defaultValue={list?.description} />
            </div>
            <div className="input">
              <input type="number" placeholder='Price' id='price' defaultValue={list?.price} />
            </div>
            <div className="input">
              <label htmlFor="slot">Slot</label>
              <select id="slot" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <Button value={list ? "Edit" : "Create"} type={"submit"} color={"primary"}/>
          </form>
        </div>
        <div id="create-right">
          <img src="/login-background.svg" alt="Login Background" />
        </div>
      </section>
    </>
  )
}