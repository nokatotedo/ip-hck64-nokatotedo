const express = require('express')
const router = express.Router()

const Kosts = require('../controllers/kosts')

router.get('/', Kosts.getKosts)
router.get('/:id', Kosts.getKost)

module.exports = router