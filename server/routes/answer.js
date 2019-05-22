const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication} = require('../middleware/authentication')
const {authorizationAnswer} = require('../middleware/authAnswer')

// console.log('pernah kesini ga');

router.post('/', authentication, AnswerController.createAnswer)
router.get('/question/:questionId', AnswerController.findByQuestion)
router.get('/:answerId', AnswerController.findOne)
router.patch('/upvote/:answerId', authentication, AnswerController.upVote)
router.patch('/downvote/:answerId', authentication, AnswerController.downVote)
router.patch('/edit/:answerId', authentication, authorizationAnswer, AnswerController.updateAnswer)
// router.delete('/delete/:answerId', authentication, authorizationAnswer, AnswerController.deleteAnswer)


module.exports = router