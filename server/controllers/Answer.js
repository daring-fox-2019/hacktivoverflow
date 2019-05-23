const QuestionModel = require('../models/Question')
const AnswerModel = require('../models/Answer')

class Answer {
  static create (req, res) {
    QuestionModel
      .findById(req.params.question_id)
      .then((question) => {
        if (question) {
          AnswerModel
            .create({
              description: req.body.description,
              author: req.user.id
            })
            .then((answer) => {
              return answer.populate('author').execPopulate()
            })
            .then((answer) => {
              question.answers.push(answer._id)
              question.save()
              res.status(201).json({ answer })
            })
        } else {
          res.status(404).json({ message: 'Question Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static votes (req, res) {
    AnswerModel.findById(req.params.answer_id)
      .then((answer) => {
        if (answer) {
          answer.upvotes.pull(req.user.id)
          answer.downvotes.pull(req.user.id)

          answer[req.body.votes].push(req.user.id)

          answer.save()
            .then((answer) => answer.populate('author').execPopulate())
            .then((answer) => res.status(200).json({ answer }))
        } else {
          res.status(404).json({ message: 'Answer Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static update (req, res) {
    AnswerModel
      .findById(req.params.answer_id)
      .then((answer) => {
        answer.description = req.body.description
        return answer.save()
      })
      .then((answer) => answer.populate('author').execPopulate())
      .then((answer) => res.status(200).json({ answer }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Answer
