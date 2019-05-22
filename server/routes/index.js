const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/questions', require('./questions'))

module.exports = routes
