const route = require('express').Router()
const {QuestionController} = require('../controllers')

route.post('/', QuestionController.create)
route.get('/', QuestionController.findAll)
route.patch('/', QuestionController.update)
route.delete('/:id', QuestionController.delete)
route.patch('/vote/:id', QuestionController.vote)
route.get('/search', QuestionController.search)

module.exports = route