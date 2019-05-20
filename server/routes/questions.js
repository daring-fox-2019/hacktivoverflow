const router = require('express').Router()
const conQuestions = require('../controllers/conQuestions')
const auth = require('../middlewares/auth')

router.use(auth.Authenticate)
router.post('/add', conQuestions.addQuestion)
router.get('/list', conQuestions.showAllQuestions)
router.put('/update/:id', auth.Authorize.updatePutQuestion, conQuestions.updatePutQuestion)
router.delete('/delete/:id', auth.Authorize.deleteQuestion, conQuestions.deleteQuestion)
router.patch('/upvote/:id', conQuestions.upvote)
router.patch('/downvote/:id', conQuestions.downvote)


module.exports = router