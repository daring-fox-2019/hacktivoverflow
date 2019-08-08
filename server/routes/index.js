const router = require('express').Router()
const answer = require('./answer')
const question = require('./question')
const user = require('./user')
const tag = require('./tag')
const api = require('./api')

router.get('/', (req, res) => {
    res.status(200).json({msg : 'connected!'})
})
router.use("/users", user)
router.use("/questions", question)
router.use("/answers", answer)
router.use("/tags", tag)
router.use("/api", api)



module.exports = router