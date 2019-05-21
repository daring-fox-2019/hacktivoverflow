const controller = require('../controllers/answer.js')
const router = require('express').Router()
const { authenticate, 
        answerAuthorization } = require('../middlewares/auth.js')
const { checkUpvoteAnswer, 
        checkDownvoteAnswer } = require('../middlewares/checkvote')

//access without login
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/question/:question_id', controller.findAnswerByQuestionId)

//authenticate
router.use(authenticate)
router.post('/', controller.create)
router.patch('/:id/upvote', checkUpvoteAnswer, controller.upvote)
router.patch('/:id/downvote', checkDownvoteAnswer, controller.downvote)


//authorization
router.use('/:id', answerAuthorization)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router