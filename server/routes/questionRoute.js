const Router = require('express').Router()
const questionController = require('../controllers/questionController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/auhtorize')

Router.get('/', questionController.gets)
Router.get('/:id', questionController.getOne)
Router.post('/',authenticate, questionController.create)
Router.put('/:id',authenticate, authorize, questionController.edit)
//upvote
//downvote
Router.delete('/:id',authenticate, authorize, questionController.delete)

module.exports = Router