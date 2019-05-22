const router = require('express').Router()
const tagController = require('../controllers/tagController')
const authentication = require('../middlewares/authentication')

router.get('/', tagController.showAll)
router.post('/addTag', authentication, tagController.addTagToUser)

module.exports = router