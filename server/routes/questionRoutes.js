const router = require("express").Router()
const questionCont = require('../controllers/questionCont')
const { AuthorizeQuestion } = require('../middlewares/authorize')
const Authenticate = require('../middlewares/authenticate')

router.post('/create', Authenticate, questionCont.create)
router.get('/read', questionCont.read)
router.get('/read/search', questionCont.search)
router.get('/read/:_id', questionCont.readOne)
router.put('/update/:_id', Authenticate, AuthorizeQuestion, questionCont.update)
router.delete('/delete/:_id', Authenticate, AuthorizeQuestion, questionCont.delete)

module.exports = router