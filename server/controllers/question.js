const { Question, Answer } = require('../models')

class ControllerQuestion {
  static create(req, res, next) {
    let { title, description, tags } = req.body
    let newQuestion = {
      title, description, tags,
      user: req.user._id,
      upvotes: [req.user._id],
      createdAt: new Date()
    }
    Question.create(newQuestion)
      .then(question => {
        res.status(201).json(question)
      })
      .catch(err => {next({ status: 500, message: err.message, origin: 'ControllerQuestion.create'})})
  }
  static findAll(req, res, next) {
    Question.find()
      .populate('upvotes', 'name')
      .populate('downvotes', 'name')
      .populate('user', 'name')
      .sort({ createdAt: 'desc'})
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => next({ status: 500, message: err.message, origin: 'ControllerQuestion.findAll'}))
  }
  static findMy(req, res, next) {
    Question.find({ user: req.user._id })
      .populate('upvotes', 'name')
      .populate('downvotes', 'name')
      .populate('user', 'name')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerQuestion.findMy'})})
  }
  static findOne(req, res, next) {
    Question.findOne({_id: req.params.questionId})
      .populate('upvotes', 'name')
      .populate('downvotes', 'name')
      .populate('user', 'name')
      .sort({ createdAt: 'desc'})
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {next({ status: 500, message: err.message, origin: 'ControllerQuestion.findOne'})})
  }
  static findByTag(req, res, next) {
    let { tag } = req.query
    Question.find({ tags: tag})
      .populate('upvotes', 'name')
      .populate('downvotes', 'name')
      .populate('user', 'name')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerQuestion.findByTag'})})
  }
  static update(req, res, next) {
    Question.findOneAndUpdate({_id: req.params.questionId}, req.body, { new: true })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => next({ status: 500, message: err.message, origin: 'ControllerQuestion.update'}))
  }
  static upvote(req, res, next) {
    Question.findOne({ upvotes: req.user._id, _id:req.params.questionId })
      .then(question => {
        if(question) {
          return Question.findOneAndUpdate({ _id: req.params.questionId }, { $pull: { upvotes: req.user._id }/* , $pull: { downvotes: req.user._id } */}, { new: true })
        } else {
          return Question.findOneAndUpdate({ _id: req.params.questionId }, { $addToSet: { upvotes: req.user._id }, $pull: { downvotes: req.user._id }}, { new: true })
        }
      })
      .then(question => {
        return question.save()
      })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerQuestion.vote'}) })
  }
  static downvote(req, res, next) {
    Question.findOne({ downvotes: req.user._id, _id:req.params.questionId })
      .then(question => {
        if(question) {
          return Question.findOneAndUpdate({ _id: req.params.questionId }, { $pull: { downvotes: req.user._id }/* , $pull: { upvotes: req.user._id } */}, { new: true })
        } else {
          return Question.findOneAndUpdate({ _id: req.params.questionId }, { $addToSet: { downvotes: req.user._id }, $pull: { upvotes: req.user._id }}, { new: true })
        }
      })
      .then(question => {
        return question.save()
      })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerQuestion.vote'}) })
  }
  static delete(req, res, next) {
    Answer.deleteMany({ question: req.params.questionId })
      .then(result => {
         return Question.findOneAndDelete({_id: req.params.questionId})
      })
      .then(question => {
        const response = {
          message: 'Successfully deleted question.',
          id: req.params.questionId
        }
        res.status(200).json(response)
      })
      .catch(err => {next({ status: 500, message: err.message, origin: 'ControllerQuestion.delete'})})
  }
}

module.exports = ControllerQuestion