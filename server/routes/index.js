const router = require('express').Router()
const question = require('./question')
const user = require('./user')
const answer = require('./answer')

router.use('/questions', question)
router.use('/answers', answer)
router.use('/user', user)

module.exports = router