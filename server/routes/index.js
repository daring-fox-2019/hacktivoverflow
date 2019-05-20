const router = require('express').Router()
const question = require('./question')
const user = require('./user')
const answer = require('./answer')
const tag = require('./tag')

router.use('/questions', question)
router.use('/answers', answer)
router.use('/user', user)
router.use('/tag', tag)

module.exports = router