const express = require("express");
const usersRouter = require("./users");
const questionsRouter = require("./questions");
const answersRouter = require("./answers");

const router = express.Router();

router.use("/api", usersRouter);
router.use("/api/questions", questionsRouter);
router.use("/api/answers", answersRouter);

module.exports = router;