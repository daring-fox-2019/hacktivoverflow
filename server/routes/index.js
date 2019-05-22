const route = require('express').Router()
const routeUser = require('./user')
const routeQuestion = require('./question')
const routeAnswer = require('./answer')

route.get('/', (req, res) => {res.status(200).json({page: 'Home', project: 'HacktivOverflow'})})

route.use('/users', routeUser)
route.use('/questions', routeQuestion)
route.use('/answers', routeAnswer)

route.use('/*', (req, res) => res.status(404).json({message: 'Not Found :('}))

module.exports = route