const express = require('express')
const router = express.Router()
const answerController = require('../../controllers/answerController')
const authenticate = require('../../middlewares/authenticate')
const authorizeAnswer = require('../../middlewares/authorizeAnswer')

router.use(authenticate)
router.get('/myAnswers', answerController.findUserAnswers)
router.get('/:QuestionId', answerController.findAll)
router.get('/:AnswerId', answerController.findOne)
router.post('/', answerController.create)
router.patch('/upvote/:AnswerId', answerController.upVote)
router.patch('/downvote/:AnswerId', answerController.downVote)
router.patch('/:AnswerId', authorizeAnswer, answerController.update)
router.delete('/:AnswerId', authorizeAnswer, answerController.delete)

module.exports = router