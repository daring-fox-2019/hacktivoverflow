const route = require('express').Router()
const UserController = require('../controllers/UserController.js')

// Register
route.post('/register', UserController.register)

// Login
route.post('/login', UserController.login)

// Find All
route.get('/', UserController.findAll)

// Find One
route.get('/:id', UserController.findOne)

module.exports = route