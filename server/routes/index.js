const router = require("express").Router()
const question = require('./questionRoutes')
const user = require("./userRoutes")
const answer = require("./answerRoutes")

router.get("/", (req, res) => {
  res.status(200).json({ message: 'connected' })
})

router.use("/questions", question)
router.use("/users", user)
router.use("/answers",answer)
module.exports = router