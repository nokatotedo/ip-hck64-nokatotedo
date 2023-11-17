const express = require('express')
const app = express()
const cors = require('cors')
const index = require('./routers/index')
const { initializeApp } = require('firebase/app')
const firebaseConfig = {
  apiKey: "AIzaSyDJi9EGb9uk5Izdas-bzQR3o89zLt1JrcU",
  authDomain: "kosth-app.firebaseapp.com",
  databaseURL: "https://kosth-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kosth-app",
  storageBucket: "kosth-app.appspot.com",
  messagingSenderId: "11211815346",
  appId: "1:11211815346:web:919c22a2630d8720340cab"
};
initializeApp(firebaseConfig)

app.use(cors())
app.use(express.json());
app.use(index)

module.exports = app