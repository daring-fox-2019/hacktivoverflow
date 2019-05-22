const express = require('express')
const router =  express.Router()

const userRouter = require('./user')
const questionRoutes = require('./questionRouter')
const answerRoutes = require('./answerRoutes')


router.use('/users',userRouter)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)



module.exports = router