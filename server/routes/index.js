const router = require("express").Router();

router.use("/users", require("./users.js"));
router.use("/qa", require("./qa.js"));

module.exports = router;