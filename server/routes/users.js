const router = require('express').Router()
const conUsers = require('../controllers/conUsers')

router.post('/register', conUsers.register)
router.post('/login', conUsers.login)

module.exports = router