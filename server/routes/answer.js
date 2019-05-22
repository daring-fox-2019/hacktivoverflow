const router = require('express').Router()
const answer = require('../controllers/answer')
const {authentication, authorizationAnswer} = require('../middleware/auth')

router.get('/', answer.findAll)
router.get('/:id', answer.findOne)

router.use(authentication)
router.patch('/:id/upvote', answer.upvote)
router.patch('/:id/downvote', answer.downvote)
router.post('/', answer.create)

router.use('/:id', authorizationAnswer)
router.put('/:id', answer.update)

module.exports = router 