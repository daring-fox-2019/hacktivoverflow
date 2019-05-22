const route = require('express').Router()

route.use('/users', require('./userRoute'))
route.use('/questions', require('./questionRoute'))
route.use('/answers', require('./answerRoute'))

module.exports = route