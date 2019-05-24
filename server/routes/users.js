const router = require("express").Router()
const Controller = require("../controllers/usercontroller.js")
const checkAuthentication = require("../middleware/checkAuthentication.js")

router.post("/register", Controller.create)
router.post("/login", Controller.login)
router.post("/check", checkAuthentication, Controller.checkLogin)
router.put("/", checkAuthentication, Controller.updatePassword)
router.put("/name", checkAuthentication, Controller.updateName)
router.delete("/", checkAuthentication, Controller.delete)

module.exports = router;