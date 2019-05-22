const userController = require('../controllers/userController')
const router = require('express').Router()
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, userController.getUser)
router.get('/questions', userController.getUserQuestions)

module.exports = router