const router = require('express').Router()
const question = require('../controllers/question')
const {authentication, authorizationQuestion} = require('../middleware/auth')

router.get('/', question.findAll)
router.get('/:id', question.findOne)

router.use(authentication)
router.patch('/:id/upvote', question.upvote)
router.patch('/:id/downvote', question.downvote)
router.get('/:id/user', question.findMine)
router.post('/', question.create)

router.use('/:id', authorizationQuestion)
router.delete('/:id', question.delete)
router.put('/:id', question.update)

module.exports = router 