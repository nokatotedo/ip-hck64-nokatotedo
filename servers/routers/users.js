const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')

router.get('/', Users.getUsersProfiles)
router.get('/:id', Users.getUserProfiles)

module.exports = router