const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')
const { roleAuth } = require('../middlewares/auth')
const kosts = require('./my-kosts')

router.get('/', Users.getMyProfiles)
router.put('/', Users.editMyProfiles)
router.patch('/', Users.changeMyPassword)

router.use(roleAuth)
router.use('/kosts', kosts)

module.exports = router