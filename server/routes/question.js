const controller = require('../controllers/question')
const router = require('express').Router()
const { authenticate, 
        questionAuthorization } = require('../middlewares/auth.js')
const { checkUpvoteQuestion, 
        checkDownvoteQuestion } = require('../middlewares/checkvote')

//access without login
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)

//authenticate
router.use(authenticate)
router.post('/', controller.create)
router.patch('/:id/upvote', checkUpvoteQuestion, controller.upvote)
router.patch('/:id/downvote', checkDownvoteQuestion, controller.downvote)

//authorization
router.use('/:id', questionAuthorization)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router