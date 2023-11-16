const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')
const Transactions = require('../controllers/transactions')
const error = require('../middlewares/error')
const { authentication } = require('../middlewares/auth')
const users = require('./users')
const my = require('./my')
const kosts = require('./kosts')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.post('/login-google', Users.loginGoogle)
router.use('/users', users)
router.use('/kosts', kosts)
router.post('/status-rent', Transactions.updateTransaction)
router.use(authentication)
router.post('/rent/:id', Transactions.createTransaction)
router.use('/my', my)
router.use(error)

module.exports = router