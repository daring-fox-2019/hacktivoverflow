const Question = require("../models/question");

class QuestionController {
  static getQuestions(req, res, next) {
    console.log("getQuestions");

    Question.find().sort({ createdAt: -1 })
      .populate({ path: "userId", select: "fullName displayPicture" })

      .then((questions) => {
        console.log("getQuestions success")
        res.status(200).json(questions);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getUserQuestions(req, res, next) {
    console.log("getUserQuestions");

    Question.find({ userId: req.authenticatedUser.id }).sort({ createdAt: -1 })
      .populate({ path: "userId", select: "fullName displayPicture" })

      .then((questions) => {
        console.log("getUserQuestions success")
        res.status(200).json(questions);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getQuestion(req, res, next) {
    console.log("getQuestion");

    Question.findOne({ _id: req.params.id })
      .populate({ path: "userId", select: "fullName displayPicture" })
      .then((question) => {
        console.log("getQuestion success");
        res.status(200).json(question);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createQuestion(req, res, next) {
    console.log("createQuestion");

    const { title, description, tags } = req.body;
    const newQuestion = {
      title,
      description,
      tags,
      userId: req.authenticatedUser.id,
    };
    Question.create(newQuestion)
      .then((question) => {
        console.log("createQuestion success");
        res.status(201).json(question);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateQuestion(req, res, next) {
    console.log("updateQuestion");

    const { title, description, tags } = req.body;
    const updatedQuestion = { title, description, tags };
    const options = { new: true, useFindAndModify: false };

    Question.findByIdAndUpdate(req.params.id, updatedQuestion, options)
      .then((question) => {
        console.log("updateQuestion success");
        res.status(200).json(question);
      })
      .catch((err) => {
        next(err);
      });
  }

  static voteQuestion(req, res, next) {
    console.log("voteQuestion");
    console.log(req.body);
    console.log(req.params);
    console.log(req.authenticatedUser.id)
    const { upvote, downvote, hasVoted } = req.body;
    const options = { new: true, useFindAndModify: false };
    let update = {};

    if (upvote && !hasVoted) {
      update = { $addToSet: { upvotes: req.authenticatedUser.id }, $pull: { downvotes: req.authenticatedUser.id } };
    } else if (upvote && hasVoted) {
      update = { $pull: { upvotes: req.authenticatedUser.id } };
    } else if (downvote && !hasVoted) {
      update = { $addToSet: { downvotes: req.authenticatedUser.id }, $pull: { upvotes: req.authenticatedUser.id } };
    } else if (downvote && hasVoted) {
      update = { $pull: { downvotes: req.authenticatedUser.id } };
    }

    Question.findByIdAndUpdate(req.params.id, update, options)
      .populate({ path: "userId", select: "fullName displayPicture" })
      .then((question) => {
        console.log("voteQuestion success");
        res.status(200).json(question);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteQuestion(req, res, next) {
    console.log("deleteQuestion");

    Question.findOneAndDelete({ _id: req.params.id })
      .then((question) => {
        console.log("deleteQuestion success");
        res.status(200).json(question);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = QuestionController;