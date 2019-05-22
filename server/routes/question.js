const route = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const Authentication = require('../middlewares/Authentication')

// READ
route.get('/',QuestionController.findAll)
route.get('/random', QuestionController.random)
route.get('/:id', QuestionController.findOne)


route.use(Authentication)

// Create
route.post('/', QuestionController.create)


// UPDATE
route.patch('/upvote/:id', QuestionController.upvote)

route.patch('/downvote/:id', QuestionController.downvote)

route.patch('/:id', QuestionController.update)

// DELETE
route.delete('/:id', QuestionController.delete)

module.exports = route