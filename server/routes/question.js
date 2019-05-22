const route = require('express').Router()
const ControllerQuestion = require('../controllers/question')
const { authenticate, authorize } = require('../middlewares/auth')

route.get('/', ControllerQuestion.findAll)
route.get('/tag', ControllerQuestion.findByTag)
route.get('/my', authenticate, ControllerQuestion.findMy)
route.get('/:questionId', ControllerQuestion.findOne)
route.post('/', authenticate, ControllerQuestion.create)

route.use('/:questionId', authenticate)
route.put('/:questionId/upvote', ControllerQuestion.upvote)
route.put('/:questionId/downvote', ControllerQuestion.downvote)

route.use('/:questionId', authenticate, authorize)
route.put('/:questionId', ControllerQuestion.update)
route.delete('/:questionId', ControllerQuestion.delete)

module.exports = route