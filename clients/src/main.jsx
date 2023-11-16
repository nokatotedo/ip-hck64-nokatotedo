import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Table from './pages/Dashboard/Table.jsx';
import Edit from './pages/Dashboard/Edit.jsx';

function mustLogin() {
  if(!localStorage.access_token) {
    return redirect('/login')
  }

  return null
}

function isLogin() {
  if(localStorage.access_token) {
    return redirect('/')
  }

  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
        loader: isLogin
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: mustLogin,
        children: [
          {
            path: '',
            element: <Table />
          },
          {
            path: 'edit',
            element: <Edit />
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
