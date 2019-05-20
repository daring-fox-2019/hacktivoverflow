const route = require('express').Router()
const QuestionController = require('../controllers/questionController')
const authenticate = require('../middlewares/authenticate')
const authorizeQuestion = require('../middlewares/authorizeQuestion')

route.get('/', QuestionController.findAll)
route.get('/tagged/:tag', QuestionController.findAllWithTags)
route.get('/:id', QuestionController.findOne)
route.post('/',  authenticate, QuestionController.create)

route.get('/:id/upvote',  authenticate, QuestionController.upvote)
route.get('/:id/downvote',  authenticate, QuestionController.downvote)

route.put('/:id', authenticate, authorizeQuestion, QuestionController.update)
route.patch('/:id', authenticate, authorizeQuestion, QuestionController.update)
route.delete('/:id', authenticate, authorizeQuestion, QuestionController.delete)

module.exports = route