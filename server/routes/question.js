const route = require('express').Router()
const QuestionController = require('../controllers/QuestionController')

// Create
route.post('/', QuestionController.create)

// READ
route.get('/',QuestionController.findAll)
route.get('/:id', QuestionController.findOne)

module.exports = route