const Router = require('express').Router()
const answerController = require('../controllers/answerController')
const authenticate = require('../middlewares/authenticate')
const authorize2 = require('../middlewares/authorize2')

Router.get('/', answerController.gets)
Router.post('/',authenticate, answerController.create)
Router.put('/:id',authenticate, answerController.edit)
//upvote
//downvote
Router.delete('/:id',authenticate, authorize2, answerController.delete) //nanti dihapus


module.exports = Router