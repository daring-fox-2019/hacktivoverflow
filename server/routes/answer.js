const route = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const Authentication = require('../middlewares/Authentication')

// READ
route.get('/allAnswer/:id', AnswerController.findAll)
route.get('/:id', AnswerController.findOne)

route.use(Authentication)

// Update
route.patch('/upvote/:id', AnswerController.upvote)
route.patch('/downvote/:id', AnswerController.downvote)

route.patch('/:id', AnswerController.update)

route.delete('/:id', AnswerController.delete)

// Create
route.post('/', AnswerController.create)

module.exports = route