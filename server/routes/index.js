const express = require('express');
const routes = express.Router();
const users = require('./users')
const questions = require('./questions')
const answers = require('./answers')

routes.use('/users', users)
routes.use('/questions', questions)
routes.use('/answers', answers)

routes.get('*', (req,res) => {
    res.send('404 page not found')
})

module.exports = routes