const routes = require('express').Router()

const UserController = require('../controllers/User')
const { loggedIn } = require('../middlewares/auth')

routes.use('/auth', require('./auth'))
routes.use('/questions', require('./questions'))

routes.get('/users/:user_id', UserController.findById)
routes.put('/user/tags', loggedIn, UserController.updateTags)

module.exports = routes
