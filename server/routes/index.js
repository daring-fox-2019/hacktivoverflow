const router = require('express').Router()
const User = require('./users')
const Answer = require('./answers')
const Question = require('./questions')
const Oauth = require('./oauth')

router.use('/answers', Answer)
router.use('/questions', Question)
router.use('/users', User)
router.use('/oauth', Oauth)

module.exports = router