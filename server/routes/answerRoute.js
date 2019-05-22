const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const authenticate = require('../middlewares/authentication')

router.get('/',AnswerController.getAll)
router.get('/:questionid',AnswerController.getQuestionAnswer)

router.use(authenticate)
router.post('/:questionid',AnswerController.create)
router.get('/:userid',AnswerController.getUserAnswer)
router.patch('/:answerid',AnswerController.update)
// router.patch('/:answerid/upvote',AnswerController.upvote)
// router.patch('/:answerid/downvote',AnswerController.downvote)
router.delete('/:questionid/:answerid',AnswerController.delete)

module.exports = router