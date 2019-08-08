const router = require('express').Router()
const ApiController = require('../controllers/ApiController')

router.post('/jobs', ApiController.githubJobs)


module.exports = router