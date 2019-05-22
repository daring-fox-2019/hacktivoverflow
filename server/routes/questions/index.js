const router = require('express').Router()
const Question = require('../../controllers/question')
const { authenticate } = require('../../middlewares/auth')
const authorization = require('../../middlewares/auth').authorQuestion

router.get('/', Question.getAllQuestion)
router.get('/tag', Question.checkTag)
router.get('/user', authenticate, Question.getAllQuestion)
router.get('/:id', Question.getOneQuestion)

router.use(authenticate)
router.post('/', Question.createQuestion)
router.patch('/upvote/:id', Question.patchUpvote)
router.patch('/downvote/:id', Question.patchDownvote)
router.patch('/:id', authorization, Question.updateQuestion)
router.delete('/:id', authorization, Question.deleteQuestion)

module.exports = router