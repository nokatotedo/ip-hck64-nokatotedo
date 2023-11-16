import { Link } from 'react-router-dom'

export default function Owner() {
  return (
    <>
      <h1>Kost List</h1>
      <div className='dashboard-table'>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kost Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Room A</td>
              <td className="info"><span className="nonactive">Pending</span></td>
              <td className="action">
                <Link to="/edit" id='btn-edit'>Edit</Link>
                <Link to="/details" id='btn-details'>Details</Link>
                <Link to="/delete" id='btn-delete'>Delete</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}