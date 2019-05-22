const QuestionModel = require('../models/Question')

class Question {
  static findAll (req, res) {
    let query = {}

    if (req.query.q) {
      query = {
        tags: req.query.q
      }
    }

    QuestionModel
      .find(query)
      .populate('author')
      .then(questions => res.status(200).json({ questions }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static findById (req, res) {
    QuestionModel
      .findById(req.params.question_id)
      .populate('author')
      .populate({
        path: 'answers',
        populate: {
          path: 'author'
        }
      })
      .then(question => {
        if (question) res.status(200).json({ question })
        else res.status(404).json({ message: 'Question Not Found' })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static create (req, res) {
    QuestionModel
      .create({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        author: req.user
      })
      .then((question) => res.status(201).json({ question }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static update (req, res) {
    QuestionModel
      .findByIdAndUpdate(req.params.question_id, {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
      }, { new: true })
      .then((question) => res.status(200).json({ question }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static delete (req, res) {
    console.log('controller delete')
    QuestionModel
      .findByIdAndDelete(req.params.question_id)
      .then(() => res.status(204).json())
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static votes (req, res) {
    QuestionModel
      .findById(req.params.question_id)
      .then((question) => {
        if (question) {
          question.upvotes.pull(req.user.id)
          question.downvotes.pull(req.user.id)

          question[req.body.votes].push(req.user.id)

          question.save()
            .then((question) => res.status(200).json({ question }))
        } else {
          res.status(404).json({ message: 'Question Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Question
