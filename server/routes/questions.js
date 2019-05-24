const express = require("express");
const QuestionController = require("../controllers/question-controller");
const { authentication, authorization } = require("../middlewares/auth");
const router = express.Router();

router.get("/", QuestionController.getQuestions);
router.get("/user", authentication, QuestionController.getUserQuestions);
router.get("/:id", QuestionController.getQuestion);
router.post("/", authentication, QuestionController.createQuestion);
router.put("/:id", authentication, authorization, QuestionController.updateQuestion);
router.patch("/:id", authentication, QuestionController.voteQuestion);
router.delete("/:id", authentication, authorization, QuestionController.deleteQuestion);

module.exports = router;