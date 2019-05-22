const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authenticate = require('../middlewares/authentication')

router.get('/',questionController.getAll)

router.use(authenticate)
router.post('/',questionController.create)
router.get('/:userid',questionController.getUserQuestion)
router.patch('/:questionid',questionController.update)
router.patch('/:questionid/upvote',questionController.upvote)
router.patch('/:questionid/downvote',questionController.downvote)
router.delete('/:questionid',questionController.delete)

module.exports = router