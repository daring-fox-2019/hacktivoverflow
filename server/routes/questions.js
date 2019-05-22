const routes = require('express').Router()

const QuestionController = require('../controllers/Question')
const AnswerController = require('../controllers/Answer')
const { loggedIn } = require('../middlewares/auth')

routes.get('/', QuestionController.findAll)
routes.get('/:question_id', QuestionController.findById)
routes.put('/:question_id', loggedIn, QuestionController.update)
routes.delete('/:question_id', loggedIn, QuestionController.delete)
routes.put('/:question_id/votes', loggedIn, QuestionController.votes)
routes.post('/', loggedIn, QuestionController.create)

routes.post('/:question_id/answers', loggedIn, AnswerController.create)
routes.put('/:question_id/answers/:answer_id/votes', loggedIn, AnswerController.votes)

module.exports = routes
