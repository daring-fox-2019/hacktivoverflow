const route = require('express').Router()
const TagController = require('../controllers/tagController')
const authenticate = require('../middlewares/authenticate')

route.get('/', TagController.findAll)
route.get('/:id', TagController.findOne)
route.post('/', authenticate, TagController.create)
route.put('/:id', authenticate, TagController.update)
route.delete('/:id', authenticate, TagController.delete)

module.exports = route