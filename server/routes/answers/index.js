const router = require('express').Router()
const Answer = require('../../controllers/answer')
const { authenticate } = require('../../middlewares/auth')
const authorization = require('../../middlewares/auth').authorAnswer

router.use( authenticate )
router.post('/', Answer.createAnswer)
router.patch('/upvote/:id', Answer.patchUpvote)
router.patch('/downvote/:id', Answer.patchDownvote)
router.patch('/:id', Answer.updateAnswer)
router.delete('/:id', Answer.deleteAnswer)
router.get('/:id', Answer.getOneAnswer)

module.exports = router