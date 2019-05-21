const controller = require('../controllers/user')
const router = require('express').Router()

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router