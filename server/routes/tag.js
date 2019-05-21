const controller = require('../controllers/tag')
const router = require('express').Router()
const {authenticate} = require('../middlewares/auth.js')

router.use(authenticate)
router.get('/', controller.findAll)
router.post('/', controller.create)
router.delete('/:id', controller.deleteOne)

module.exports = router