/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import NotificationContext from './contexts/NotificationContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(notification) {
      switch(notification.type) {
        case 'error': {
          toast.error(notification.message)
          break
        }

        case 'success': {
          toast.success(notification.message)
          break
        }
      }
      
      if(notification.message === "Invalid Token") {
        localStorage.removeItem("access_token")
        navigate('/login')
      }
      setNotification(null)
    }
  }, [notification])

  return (
    <>
    
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>  
        <NotificationContext.Provider value={{notification, setNotification}}>
          <ToastContainer />
          <Navbar />
          <Outlet />
        </NotificationContext.Provider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
