import { useContext, useEffect, useState } from "react"
import NotificationContext from "../../../contexts/NotificationContext"
import axios from "axios"
import ClientList from "./ClientList"

export default function Client() {
  const [transactions, setTransactions] = useState(null)
  const notification = useContext(NotificationContext)

  useEffect(() => {
    getTransactions()
  }, [notification.notification])

  async function getTransactions() {
    try {
      const { data } = await axios({
        url: 'https://kosth-server.nokatotedo.my.id/my/payment',
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      setTransactions(data)
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
      <h1>Transactions</h1>
      <div className="dashboard-table" id="client">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kost Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map((transaction, i) => { return <ClientList list={transaction} key={transaction.id} index={i} /> })}
          </tbody>
        </table>
      </div>
    </>
  )
}