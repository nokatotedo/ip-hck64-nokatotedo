const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')
const error = require('../middlewares/error')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.use(error)

module.exports = router