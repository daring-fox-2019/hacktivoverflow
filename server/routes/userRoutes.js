const router = require("express").Router()
const UserCont = require('../controllers/userCont')
const Authenticate = require('../middlewares/authenticate')

router.get('/questions', Authenticate, UserCont.readOne)
router.post('/register', UserCont.register)
router.post('/login',UserCont.login)
router.post('/signingoogle', UserCont.GoogleSignIn)

module.exports = router