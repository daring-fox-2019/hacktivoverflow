const express = require("express");
const AnswerController = require("../controllers/answer-controller");
const { authentication, authorizationForAnswer } = require("../middlewares/auth");
const router = express.Router();

router.get("/", AnswerController.getAnswers)
router.get("/:id", AnswerController.getAnswer);
router.post("/", authentication, AnswerController.createAnswer);
router.put("/:id", authentication, authorizationForAnswer, AnswerController.updateAnswer);
router.patch("/:id", authentication, AnswerController.voteAnswer);
router.delete("/:id", authentication, authorizationForAnswer, AnswerController.deleteAnswer);

module.exports = router;