const route = require('express').Router()
const question = require('./question')
const auth = require('./auth')
const answer = require('./answer')
const tag = require('./tag')

route.use('/questions', question)
route.use('/auth', auth)
route.use('/answers', answer)
route.use('/tags', tag)

module.exports = route