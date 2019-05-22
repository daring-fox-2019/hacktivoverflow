const Router = require('express').Router()
const userController = require('../controllers/userController')

Router.get('/', userController.gets)
Router.post('/login', userController.login)
Router.post('/register', userController.register)
Router.delete('/:id', userController.delete)

module.exports = Router