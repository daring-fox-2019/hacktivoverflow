const route = require('express').Router()
const { ControllerUser } = require('../controllers')
const { ControllerQuestion } = require('../controllers')
const { ControllerAnswer } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

route.get('/', (req, res) => {res.status(200).json({message: 'Home'})})
route.post('/user/register', ControllerUser.create)
route.post('/user/login', ControllerUser.login)

route.post('/questions',authenticate,ControllerQuestion.create)
route.get('/questions',ControllerQuestion.findAll)
route.get('/questions/:id',authenticate,ControllerQuestion.findOne)
route.put('/questions/:id',authenticate,ControllerQuestion.update)
route.delete('/questions/:id',authenticate,ControllerQuestion.delete)
route.get('/question/:questionId/answers',authenticate,ControllerAnswer.findAll)

route.post('/answers',authenticate,ControllerAnswer.create)
route.get('/answers/:id',authenticate,ControllerAnswer.findOne)
route.put('/answers/:id',authenticate,ControllerAnswer.update)
route.delete('/answers/:id',authenticate,ControllerAnswer.deleteMany) // user promise all delete questions and delete answers with questionId

route.post('/questions/:id/upVotes',authenticate,ControllerQuestion.upVote)
route.post('/questions/:id/downVotes',authenticate,ControllerQuestion.downVote)
route.post('/answers/:id/upVotes',authenticate,ControllerAnswer.upVote)
route.post('/answers/:id/downVotes',authenticate,ControllerAnswer.downVote)
route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route