const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/questionController')
const authenticate = require('../../middlewares/authenticate')
const authorizeQuestion = require('../../middlewares/authorizeQuestion')

router.use(authenticate)
router.post('/', questionController.create)
router.get('/', questionController.findAll)
router.get('/myQuestions', questionController.findUserQuestions)
router.get('/:QuestionId', questionController.findOne)
router.patch('/upvote/:QuestionId', questionController.upVote)
router.patch('/downvote/:QuestionId', questionController.downVote)
router.patch('/:QuestionId', authorizeQuestion, questionController.update)
router.delete('/:QuestionId', authorizeQuestion, questionController.delete)

module.exports = router
