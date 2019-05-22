const Answer = require("../models/answer");

class AnswerController {
  static getAnswers(req, res, next) {
    console.log("getAnswers");
    
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
    console.log("getAnswer");

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
    console.log("createAnswer");

    const { title, description } = req.body;
    const newAnswer = { title, description };
    Answer.create(newAnswer)
      .then((answer) => {
        console.log("createAnswer success");
        res.status(201).json(answer);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateAnswer(req, res, next) {
    console.log("updateAnswer");

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
    console.log("voteAnswer");

    const { title, description } = req.body;
    const updatedAnswer = { title, description };
    const options = { new: true, useFindAndModify: false };

    Answer.findByIdAndUpdate(req.params.id, updatedAnswer, options)
      .then((answer) => {
        console.log("voteAnswer success");
        res.status(200).json(answer);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteAnswer(req, res, next) {
    console.log("deleteAnswer");

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