const route = require('express').Router()
const AnswerController = require('../controllers/answerController')
const authenticate = require('../middlewares/authenticate')
const authorizeAnswer = require('../middlewares/authorizeAnswer')

route.get('/', AnswerController.findAll)
route.get('/:id', AnswerController.findOne)
route.post('/:questionId',  authenticate, AnswerController.create)
route.get('/:id/upvote',  authenticate, AnswerController.upvote)
route.get('/:id/downvote',  authenticate, AnswerController.downvote)
route.put('/:id', authenticate, authorizeAnswer, AnswerController.update)
route.delete('/:id', authenticate, authorizeAnswer, AnswerController.delete)

module.exports = route