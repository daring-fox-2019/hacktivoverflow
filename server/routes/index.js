const router = require('express').Router();
const questionRouter = require('./question')
const userRouter = require('./user')
const answerRouter = require('./answer')
const commentRouter = require('./comment')
const authRouter = require('./auth')
const question = require('../controller/question')
const answer = require('../controller/answer')
const comment = require('../controller/comment')
const {authorize} = require('../middlewares')

router.use('/auth',authRouter)
router.get('/home',question.GetQuestionHome)
router.get('/topic/:id',question.GetTopic)
router.get('/answer/:id',answer.GetOneAnswer)
router.get('/comment/:id',comment.GetOne)

router.use(authorize)
router.use('/question',questionRouter)
router.use('/answer',answerRouter)
router.use('/comment',commentRouter)
router.use('/user',userRouter)

module.exports = router