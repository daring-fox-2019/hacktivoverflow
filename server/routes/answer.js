const route = require('express').Router()
const AnswerController = require('../controllers/AnswerController')

// Create
route.post('/', AnswerController.create)

// READ
route.get('/',AnswerController.findAll)
route.get('/:id', AnswerController.findOne)

module.exports = route