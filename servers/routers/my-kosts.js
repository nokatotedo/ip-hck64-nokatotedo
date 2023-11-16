const express = require('express')
const router = express.Router()

const Kosts = require('../controllers/kosts')
const { ownerAuth } = require('../middlewares/auth')

router.post('/', Kosts.createMyKost)
router.get('/', Kosts.getMyKosts)
router.put('/:id', ownerAuth, Kosts.editMyKost)
router.delete('/:id', ownerAuth, Kosts.deleteMyKost)
router.patch('/:id', ownerAuth, Kosts.updateStatusKost)

module.exports = router