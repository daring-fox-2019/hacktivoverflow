const router = require('express').Router()
const user = require('../controllers/user')

router.post('/signup', user.create)
router.post('/signin', user.login)
router.get('/', user.findAll)
router.delete('/:id', user.delete)

module.exports = router 
