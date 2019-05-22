const router = require('express').Router()
const userController = require('../controllers/userController.js')
const images = require('../helpers/images.js')

router.use('/user', require('./userRoutes.js'))
router.use('/questions', require('./questionRoutes.js'))
router.post('/signin', userController.signin)
router.post('/register', userController.register)
router.post('/upload',
    images.multer.single('image'),
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    })

module.exports = router