const router = require('express').Router()
const authorize = require('../middleware/authorize.js')
const authenticate = require('../middleware/authenticate')
const questionController = require('../controllers/questionController')

router.get('/', questionController.getAllQuestion)
router.post('/', authenticate, questionController.askQuestion)

router.get('/:questionId', questionController.getOneQuestion)
router.put('/:questionId', authenticate, authorize, questionController.editQuestion)
router.put('/:questionId/upvote', authenticate, questionController.upvoteQuestion)
router.put('/:questionId/downvote', authenticate, questionController.downvoteQuestion)
router.put('/:questionId/solve', authenticate, questionController.markAsSolved)
router.put('/:questionId/unsolve', authenticate, questionController.markAsUnsolved)

router.get('/:questionId/answers', questionController.getAllAnswers)
router.post('/:questionId/answers', authenticate, questionController.createAnswer)

router.get('/:questionId/answers/:answerId', questionController.getOneAnswer)
router.put('/:questionId/answers/:answerId', authenticate, authorize, questionController.editAnswer)
router.put('/:questionId/answers/:answerId/upvote', authenticate, questionController.upvoteAnswer)
router.put('/:questionId/answers/:answerId/downvote', authenticate, questionController.downvoteAnswer)

router.delete('/:questionId', authenticate, authorize, questionController.deleteQuestion)
router.delete('/:questionId/answers/:answerId', authenticate, authorize, questionController.deleteAnswer)

module.exports = router