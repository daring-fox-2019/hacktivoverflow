const route = require('express').Router()
const User = require('./user')
const Answer = require('./answer')
const Question = require('./question')

route.use('/user', User)
route.use('/answer', Answer)
route.use('/question', Question)

module.exports = route