const router = require("express").Router()
const Controller = require("../controllers/qacontroller.js")
const checkAuthentication = require("../middleware/checkAuthentication.js")

router.get("/questions", checkAuthentication, Controller.getQuestions)
router.get("/answers/:id", checkAuthentication, Controller.getAnswers)
// router.get("/:id", checkAuthentication, Controller.readOne)
router.post("/", checkAuthentication, Controller.create)
router.delete("/:id", checkAuthentication, Controller.delete)
router.put("/:id", checkAuthentication, Controller.update)

module.exports = router;