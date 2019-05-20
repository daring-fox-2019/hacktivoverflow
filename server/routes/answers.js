const router = require('express').Router()
const conAnswers = require('../controllers/conAnswers')
const auth = require('../middlewares/auth')

router.use(auth.Authenticate)
router.post('/add', conAnswers.addAnswer)
router.get('/list', conAnswers.showAllAnswers)
router.put('/update/:id', auth.Authorize.updatePutAnswer, conAnswers.updatePutAnswer)
router.delete('/delete/:id', auth.Authorize.deleteAnswer, conAnswers.deleteAnswer)
router.patch('/upvote/:id', conAnswers.upvote)
router.patch('/downvote/:id', conAnswers.downvote)

module.exports = router