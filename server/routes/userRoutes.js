const router = require("express").Router()
const UserCont = require('../controllers/userCont')
// const Authenticate = require('../middlewares/authenticate')

router.get('/questions/:_id', UserCont.readOne)
router.post('/register', UserCont.register)
router.post('/login',UserCont.login)

module.exports = router