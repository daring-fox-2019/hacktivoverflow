const { Answer, Question } = require('../models')

class ControllerAnswer {
  static create(req, res, next) {
    let { title, description, question } = req.body
    let newAnswer = {
      title, description, question,
      user: req.user._id,
      upvotes: [req.user._id],
      createdAt: new Date()
    }
    Answer.create(newAnswer)
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.create' }) })
  }
  static findAll(req, res, next) {
    Answer.find()
      .populate('user')
      .populate('question')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(err => next({ status: 500, message: err.message, origin: 'ControllerAnswer.findAll' }))
  }
  static findOne(req, res, next) {
    Answer.findOne({ _id: req.params.answerId })
      .populate('user')
      .populate('question')
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.findOne' }) })
  }
  static findMy(req, res, next) {
    Answer.find({ user: req.user._id })
      .populate('user')
      .populate('question')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.findMy'})})
  }
  static findByQuestion(req, res, next) {
    let { questionId } = req.query
    Answer.find({ question: questionId })
      .populate('upvotes', 'name')
      .populate('downvotes', 'name')
      .populate('user', 'name')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.findByQuestion' }) })
  }
  static update(req, res, next) {
    Answer.findOneAndUpdate({ _id: req.params.answerId }, req.body, { new: true })
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => next({ status: 500, message: err.message, origin: 'ControllerAnswer.update' }))
  }
  static upvote(req, res, next) {
    Answer.findOne({ upvotes: req.user._id, _id: req.params.answerId })
      .then(question => {
        if (question) {
          return Answer.findOneAndUpdate({ _id: req.params.answerId }, { $pull: { upvotes: req.user._id }/* , $pull: { downvotes: req.user._id } */ }, { new: true })
        } else {
          return Answer.findOneAndUpdate({ _id: req.params.answerId }, { $addToSet: { upvotes: req.user._id }, $pull: { downvotes: req.user._id } }, { new: true })
        }
      })
      .then(question => {
        return question.save()
      })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.vote' }) })
  }
  static downvote(req, res, next) {
    Answer.findOne({ downvotes: req.user._id, _id: req.params.answerId })
      .then(question => {
        if (question) {
          return Answer.findOneAndUpdate({ _id: req.params.answerId }, { $pull: { downvotes: req.user._id }/* , $pull: { upvotes: req.user._id } */ }, { new: true })
        } else {
          return Answer.findOneAndUpdate({ _id: req.params.answerId }, { $addToSet: { downvotes: req.user._id }, $pull: { upvotes: req.user._id } }, { new: true })
        }
      })
      .then(question => {
        return question.save()
      })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.vote' }) })
  }
  static delete(req, res, next) {
    Answer.findOneAndDelete({ _id: req.params.answerId })
      .then(answer => {
        const response = {
          message: 'Successfully deleted answer.',
          id: req.params.answerId
        }
        res.status(200).json(response)
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerAnswer.delete' }) })
  }
}

module.exports = ControllerAnswer