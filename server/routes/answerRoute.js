const route = require('express').Router()
const { AnswerController } = require('../controllers')

route.get('/', AnswerController.find)
route.post('/', AnswerController.create)
route.patch('/', AnswerController.update)
route.patch('/vote/:id', AnswerController.vote)

module.exports = route