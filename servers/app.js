const express = require('express')
const app = express()
const index = require('./routers/index')

app.use(express.json());
app.use(index)

module.exports = app