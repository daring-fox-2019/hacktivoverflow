const route = require('express').Router()
const User = require('./user')

route.use(User)

module.exports = route