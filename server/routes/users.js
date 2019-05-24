const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/authenticate')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.get('/userLoggedIn', Authentication, UserController.findOne)

module.exports = routes