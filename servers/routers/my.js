const express = require('express')
const router = express.Router()

const Users = require('../controllers/users')
const Kosts = require('../controllers/kosts')
const { ownerAuth, roleAuth } = require('../middlewares/auth')

router.get('/', Users.getMyProfiles)
router.put('/', Users.editMyProfiles)
router.patch('/', Users.changeMyPassword)

router.use(roleAuth)
router.post('/kosts', Kosts.createMyKost)
router.get('/kosts', Kosts.getMyKosts)
router.put('/kosts/:id', ownerAuth, Kosts.editMyKost)
router.delete('/kosts/:id', ownerAuth, Kosts.deleteMyKost)

module.exports = router