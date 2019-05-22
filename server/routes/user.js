const controller = require('../controllers/user')
const router = require('express').Router()
const { authenticate } = require('../middlewares/auth')

router.post('/login', controller.login)
router.post('/register', controller.register)

router.use(authenticate)
router.patch('/tags', controller.updateTag)
router.get('/tags', controller.fetchTag)

module.exports = router