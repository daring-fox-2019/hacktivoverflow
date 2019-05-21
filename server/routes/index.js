const router = require('express').Router()
const questionRouter = require('./question')
const answerRouter = require('./answer')
const userRouter = require('./user')

router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
router.use('/users', userRouter)

router.get('/*', (req,res) => {
    res.status(404).json({message:'not found'})
})

module.exports = router