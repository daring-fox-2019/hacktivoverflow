const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/',questionController.showAll)

router.get('/myList', authentication, questionController.showList)

router.get('/tags', authentication, questionController.showByTags)

router.get('/preferred-discussions', authentication, questionController.preferredDiscussions)
router.get('/:questionId', questionController.showOne)

router.use(authentication)
router.patch('/:id', authorization, questionController.update)
router.delete('/:id', authorization, questionController.delete)
router.put('/:questionId/upvote', questionController.upvote)
router.put('/:questionId/downvote', questionController.downvote)
router.post('/', questionController.create);

module.exports = router
