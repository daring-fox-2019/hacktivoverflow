const router = require('express').Router()
const UserController = require('../controllers/user')
const QuestionController = require('../controllers/question')
const AnswerController = require('../controllers/answer')
const isAunthenticate = require('../middlewares/Authentication')
const isQuestionAuthorize = require('../middlewares/AuhorizationQuestion')
const isAnswerAuthorize = require('../middlewares/AuthorizationAnswer')
router.get('/', QuestionController.read)
router.post('/', isAunthenticate, QuestionController.create)
router.get('/:id', QuestionController.readOne)
router.put('/:id', isAunthenticate, isQuestionAuthorize ,QuestionController.update)
router.delete('/:id',isAunthenticate, isQuestionAuthorize ,QuestionController.delete)

router.get('/answer/:id', isAunthenticate, AnswerController.readOne)
router.post('/answer', isAunthenticate, AnswerController.create)
router.patch('/answer/:id', isAunthenticate, isAnswerAuthorize, AnswerController.update)

router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)

module.exports = router