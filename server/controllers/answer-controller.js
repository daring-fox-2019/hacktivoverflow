const Answer = require("../models/answer");
const Question = require("../models/question");

class AnswerController {
  static getAnswers(req, res, next) {
    Answer.find()
      .then((answers) => {
        console.log("getAnswers success")
        res.status(200).json(answers);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAnswer(req, res, next) {
    Answer.findOne({ _id: req.params.id })
      .then((answer) => {
        console.log("getAnswer success");
        res.status(200).json(answer);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createAnswer(req, res, next) {
    const { content, questionId } = req.body;
    const newAnswer = { 
      content,
      questionId,
      userId: req.authenticatedUser.id,
    };

    let createdAnswer = null;
    Answer.create(newAnswer)
      .then((answer) => {
        console.log("createAnswer success");
        createdAnswer = answer;
        return Question.findByIdAndUpdate(questionId, { $push: { answers: answer._id } }, { new: true, useFindAndModify: false  })
      })
      .then((question) => {
        res.status(201).json(createdAnswer);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateAnswer(req, res, next) {
    const { title, description } = req.body;
    const updatedAnswer = { title, description };
    const options = { new: true, useFindAndModify: false };

    Answer.findByIdAndUpdate(req.params.id, updatedAnswer, options)
      .then((answer) => {
        console.log("updateAnswer success");
        res.status(200).json(answer);
      })
      .catch((err) => {
        next(err);
      });
  }

  static voteAnswer(req, res, next) {
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.authenticatedUser.id)

    const { upvote, downvote } = req.body;
    const options = { new: true, useFindAndModify: false };
    let update = {};

    if (upvote) {
      update = { $addToSet: { upvotes: req.authenticatedUser.id }, $pull: { downvotes: req.authenticatedUser.id } };
    } else if (downvote) {
      update = { $addToSet: { downvotes: req.authenticatedUser.id }, $pull: { upvotes: req.authenticatedUser.id } };
    }

    Answer.findByIdAndUpdate(req.params.id, update, options)
      .populate({ path: "userId", select: "fullName" })
      .then((answer) => {
        console.log("voteAnswer success");
        res.status(200).json(answer);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteAnswer(req, res, next) {
    Answer.findOneAndDelete({ _id: req.params.id })
      .then((answer) => {
        console.log("deleteAnswer success");
        res.status(200).json(answer);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = AnswerController;