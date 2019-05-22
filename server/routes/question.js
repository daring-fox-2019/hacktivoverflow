const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication} = require('../middleware/authentication')
const {authorizationQuestion} = require('../middleware/authQuestion')

router.get('/', QuestionController.findAll)
router.get('/preferred-dicussions', authentication, QuestionController.findWatched)
router.get('/user/:userId', QuestionController.findByUser)
router.post('/tag', authentication,  QuestionController.findByTag)
router.get('/:questionId', QuestionController.findOne)
router.post('/', authentication, QuestionController.createQuestion)
router.patch('/upvote/:questionId', authentication, QuestionController.upVote)
router.patch('/downvote/:questionId', authentication, QuestionController.downVote)
router.patch('/edit/:questionId',authentication, authorizationQuestion,  QuestionController.updateQuestion)
router.delete('/delete/:questionId', authentication, authorizationQuestion, QuestionController.deleteQuestion)


module.exports = router