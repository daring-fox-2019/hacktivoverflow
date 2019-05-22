const router = require("express").Router()
const answerCont = require('../controllers/answerCont')
const { AuthorizeAnswer } = require('../middlewares/authorize')
const Authenticate = require('../middlewares/authenticate')

router.post('/create/:questionid', Authenticate, answerCont.create)
router.get('/read', answerCont.read)
router.get('/read/search', answerCont.search)
router.get('/read/:_id', answerCont.readOne)
router.put('/update/:_id', Authenticate, AuthorizeAnswer, answerCont.update)
router.delete('/delete/:_id', Authenticate, AuthorizeAnswer, answerCont.delete)

module.exports = router