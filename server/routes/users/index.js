const router = require('express').Router()
const User = require('../../controllers/user')
const { authenticate } = require('../../middlewares/auth')

router.post('/register', User.create)
router.post('/login', User.postLogin)
router.patch('/', authenticate, User.updateUser)
router.get('/:id', authenticate, User.getOneUser)

module.exports = router