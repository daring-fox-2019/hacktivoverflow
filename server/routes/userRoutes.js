const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/signUp', userController.register)
router.post('/signIn', userController.signIn)
router.get('/', authentication, userController.getUser)
router.get('/tags', authentication, userController.showTags)
router.patch('/preferred-discussions', authentication, userController.removeTag)


module.exports = router
