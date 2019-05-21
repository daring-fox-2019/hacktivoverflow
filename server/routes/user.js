const route = require('express').Router()
const UserController = require('../controllers/UserController.js')
const Authentication = require('../middlewares/Authentication')


// Register
route.post('/register', UserController.register)

// Login
route.post('/login', UserController.login)


// Find All
route.get('/', UserController.findAll)

// Find One
route.get('/:id', UserController.findOne)

// Stay logged in
route.use(Authentication)
route.post('/token', UserController.token)

module.exports = route