const router = require('express').Router()
const TagController = require('../controllers/TagController')
const {authentication} = require('../middleware/authentication')


router.post('/', authentication, TagController.create)
router.get('/', TagController.findAll)
router.post('/add', authentication, TagController.addTagToUser)
router.get('/:id', TagController.findOne)

module.exports = router