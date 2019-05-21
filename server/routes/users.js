const router = require('express').Router()
const conUsers = require('../controllers/conUsers')
const auth = require('../middlewares/auth')

router.post('/register', conUsers.register)
router.post('/login', conUsers.login)
router.get('/', auth.Authenticate, conUsers.getUserInfo)
router.patch('/addtag/:tag', auth.Authenticate, conUsers.addTag)
router.patch('/removetag/:tag', auth.Authenticate, conUsers.removeTag)

module.exports = router