import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../contexts/NotificationContext";
import Card from "../components/Card";
import './styles/Home.css'

export default function Home() {
  const notification = useContext(NotificationContext)
  const [kosts, setKosts] = useState(null)

  useEffect(() => {
    getKost()
  }, [notification.notification])

  async function getKost() {
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/kosts'
      })
      
      setKosts(data)
    } catch (error) {
      notification.setNotification({
        type: 'error',
        message: error.response.data.message
      })
    }
  }

  return (
    <>
      <section id="home">
        <h1>Buy Kost</h1>
        <div id="card-container">
          {kosts && kosts.map((kost) => { return <Card kost={kost} key={kost.id}/>})}
        </div>
      </section>
    </>
  )
}