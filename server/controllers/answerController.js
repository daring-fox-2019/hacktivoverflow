const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");
class AnswerController {
  static create(req, res) {
    Answer.create(req.body)
      .then(data => {
        return Question.findByIdAndUpdate(data.question, {
          $push: {
            answers: data._id
          }
        });
      })
      .then(data => {
        console.log(data), "setelah update";

        res.status(201).json({ data, message: "Your answer is posted!" });
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static showAll(req, res) {
    Answer.find({
      question: req.params.questionId
    })
      .populate("user")
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static showOne(req, res) {
    Answer.findById(req.params.answerId)
      .populate("user")
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static upvote(req, res) {
    Answer.findById(req.params.answerId)
      .populate("user")
      .then(data => {
      
        let downVote = data.downvotes.find(el => {
          return el == req.authenticatedUser.id;
        });
        let upVote = data.upvotes.find(el => {
          return el == req.authenticatedUser.id;
        });
        let sameVoter = req.authenticatedUser.id == data.user._id;

        if (sameVoter) {
          res.status(400).json({
            message: "you cannot vote your answer"
          });
        } else if (!downVote && !upVote) {
          data.upvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (downVote && !upVote) {
          data.downvotes = data.downvotes.filter(el => {
            return el.toString() !== req.authenticatedUser.id;
          });
          data.upvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (!downVote && upVote) {
          res.status(400).json({
            message: "You already upvote this answer"
          });
        }
      })
      .then(results => {
        console.log(results,'====');
        
        res.status(200).json({countVote : results.upvotes.length - results.downvotes.length});
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static downvote(req, res) {
    
    Answer.findById({ _id: req.params.answerId })
      .then(data => {
        let sameVoter = data.user._id == req.authenticatedUser.id;
        let downVote = data.downvotes.find(el => {
          return el == req.authenticatedUser.id;
        });
        let upVote = data.upvotes.find(el => {
          return el == req.authenticatedUser.id;
        });

        if (sameVoter) {
          res.status(400).json({
            message: "you cannot vote your answer"
          });
        } else if (!downVote && !upVote) {
          data.downvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (upVote && !downVote) {
          data.upvotes = data.upvotes.filter(el => {
            return el.toString() !== req.authenticatedUser.id;
          });
          data.downvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (!upVote && downVote) {
          res.status(400).json({
            message: "You already downvote this answer"
          });
        }
      })
      .then(data => {
        
        res.status(200).json({countVote : data.upvotes.length - data.downvotes.length});
      })
      .catch(err => {
        console.log(err,'apa ini errornya????')
        res.status(500).json(err);
      });
  }

  static update(req, res) {
    let { title, description, question, user } = req.body;
    Answer.findByIdAndUpdate(req.params.answerId, {
      title,
      description,
      question,
      user
    })
      .then(data => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static delete(req, res) {
    Answer.deleteOne({
      _id: req.params.id
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
}

module.exports = AnswerController;
