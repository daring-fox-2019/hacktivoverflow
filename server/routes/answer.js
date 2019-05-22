const route = require('express').Router()
const ControllerAnswer = require('../controllers/answer')
const { authenticate, authorize } = require('../middlewares/auth')

route.get('/', ControllerAnswer.findAll)
route.get('/question', ControllerAnswer.findByQuestion)
route.use('/my', authenticate, ControllerAnswer.findMy)
route.get('/:answerId', ControllerAnswer.findOne)
route.post('/', authenticate, ControllerAnswer.create)

route.use('/:answerId', authenticate)
route.put('/:answerId/upvote', ControllerAnswer.upvote)
route.put('/:answerId/downvote', ControllerAnswer.downvote)

route.use('/:answerId', authenticate, authorize)
route.put('/:answerId', ControllerAnswer.update)
route.delete('/:answerId', ControllerAnswer.delete)

module.exports = route