const router = require('express').Router()
const questionRoute = require('../routes/questionRoute')
const answerRoute = require('../routes/answerRoute')
const userController = require('../controllers/userController')

router.use('/questions',questionRoute)
router.use('/answers',answerRoute)

router.get('/allusers',userController.getAll)
router.post('/login',userController.login)
router.post('/register',userController.register)


module.exports = router