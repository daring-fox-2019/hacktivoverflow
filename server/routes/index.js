const express = require('express')
const router = express.Router()
const user = require('./user')
const question = require('./question')
const answer = require('./answer')

router.use('/users', user)
router.use('/questions', question)
router.use('/answers', answer)

module.exports = router