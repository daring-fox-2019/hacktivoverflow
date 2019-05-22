const router = require("express").Router()
const Controller = require("../controllers/qacontroller.js")
const checkAuthentication = require("../middleware/checkAuthentication.js")

router.get("/questions", Controller.getQuestions) // Gets all questions
router.get("/answers/:id", Controller.getAnswers) // Gets all answers for question id
router.post("/", checkAuthentication, Controller.create) // Create new question or answer
router.delete("/:id", checkAuthentication, Controller.delete) // Delete question only
router.put("/:id", checkAuthentication, Controller.update) // Update question title/content or answer content
router.put("/vote/:id", checkAuthentication, Controller.vote) // Vote on question or answer

module.exports = router;