const express = require("express");
const AnswerController = require("../controllers/answer-controller");
const router = express.Router();

router.get("/", AnswerController.getAnswers)
router.get("/:id", AnswerController.getAnswer);
router.post("/", AnswerController.createAnswer);
router.put("/:id", AnswerController.updateAnswer);
router.patch("/:id", AnswerController.voteAnswer);
router.delete("/:id", AnswerController.deleteAnswer);

module.exports = router;