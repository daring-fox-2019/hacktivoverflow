const router = require('express').Router()
const User = require('../../controllers/user')

router.post('/google-sign-in', User.googleSignIn)

module.exports = router