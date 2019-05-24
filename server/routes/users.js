const express = require("express");
const UserController = require("../controllers/user-controller");
const { authentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.createUser);
router.get("/user", authentication, UserController.getUser);
router.post("/user", authentication, UserController.addTag);

module.exports = router;