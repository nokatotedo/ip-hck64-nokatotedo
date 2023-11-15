const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')
const error = require('../middlewares/error')
const { authentication } = require('../middlewares/auth')
const users = require('./users')
const my = require('./my')
const kosts = require('./kosts')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.use('/users', users)
router.use('/kosts', kosts)
router.use(authentication)
router.use('/my', my)
router.use(error)

module.exports = router