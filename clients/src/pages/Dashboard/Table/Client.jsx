export default function Client() {
  return (
    <>
      <h1>Transactions</h1>
      <div className="dashboard-table">
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
            <tr>
              <td>1</td>
              <td>Room A</td>
              <td>16-11-2023</td>
              <td className="info"><span className="nonactive">Pending</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Room B</td>
              <td>16-11-2023</td>
              <td className="info"><span className="active">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}