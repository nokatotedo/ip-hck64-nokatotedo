require('dotenv').config()
const jwt = require('jsonwebtoken')

function createToken(input) {
  return jwt.sign(input, process.env.JWT_TOKEN)
}

function verifyToken(input) {
  return jwt.verify(input, process.env.JWT_TOKEN)
}

module.exports = {
  createToken,
  verifyToken
}