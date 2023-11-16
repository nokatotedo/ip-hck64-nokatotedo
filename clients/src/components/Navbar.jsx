import './styles/Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <nav>
      <div className="logo">
        <Link to="/">Kosth</Link>
      </div>
      <div id="users">
        {localStorage.access_token ? 
        <>
          <Link to="/dashboard" id='icon-dashboard'><i className="fa-solid fa-user"></i></Link>
          <Link to="/dashboard" id='btn-dashboard'>Dashboard</Link>
          <Link to="/login" id='btn-logout' onClick={() => {
            localStorage.removeItem("access_token")
          }}>Logout</Link>
        </> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  )
}