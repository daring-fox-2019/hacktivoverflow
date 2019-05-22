const express = require('express')
const router = express.Router()
const userController = require('../controller/UserControlller')

router.get('/', (req, res) => {
  res.status(200).json('masuk user')
})


router.post('/', userController.registrasi)
router.post('/login', userController.signin)
router.post('/googlesignin', userController.googleSignin)



module.exports = router