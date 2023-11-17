const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')
const Transaction = require('../controllers/transactions')
const { roleAuth, clientAuth } = require('../middlewares/auth')
const kosts = require('./my-kosts')

router.get('/', Users.getMyProfiles)
router.put('/', Users.editMyProfiles)
router.patch('/', Users.changeMyPassword)
router.get('/payment', clientAuth, Transaction.getTransactions)

router.use(roleAuth)
router.use('/kosts', kosts)

module.exports = router