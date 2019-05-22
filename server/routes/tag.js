const router = require('express').Router()
const tag = require('../controllers/tag')

router.get('/', tag.findAll)

module.exports = router 
