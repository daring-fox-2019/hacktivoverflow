const Model = require('../models/question')
const { tag } = require('../helpers/tag')

class Question {
  static findAll(req, res) {
    Model.find()
      .populate('userId')
      .populate({
        path: 'answers',
        populate: {
          path: 'userId'
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static search(req, res) {
    Model.find(req.body.datas)
      .populate('userId')
      .populate({
        path: 'answers',
        populate: {
          path: 'userId'
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findMine(req, res) {
    Model.find({ userId: req.userId })
      .populate('userId')
      .populate({
        path: 'answers',
        populate: {
          path: 'userId'
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    let newQuestion = new Model({
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      answers: [],
      userId: req.userId,
      tags: req.body.tags,
    })
    Model.create(newQuestion)
      .then(data => {
        res.status(201).json(data)
        tag(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findOne(req, res) {
    Model.findById(req.params.id)
      .populate({
        path: 'answers',
        populate: {
          path: 'userId'
        }
      })
      .populate('userId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static delete(req, res) {
    Model.findByIdAndDelete({ _id: req.params.id }, { useFindAndModify: true })
      .then(() => {
        res.status(200).json("Delete Success")
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update(req, res) {
    let newData = {
      title: req.body.title,
      description: req.body.description,
    }
    Model.findByIdAndUpdate(req.params.id, { $set: newData }, { useFindAndModify: true, new: true })
      .then(data => {
        res.status(200).json(data)
        tag(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static upvote(req, res) {
    Model.findOne({
      $and: [
        { upvotes: req.userId },
        { _id: req.params.id }
      ]
    })
      .then(data => {
        if (!data) {
          Model.findByIdAndUpdate(req.params.id, { $push: { upvotes: req.userId }, $pull: { downvotes: req.userId } }, { useFindAndModify: true, new: true })
            .then(data => {
              res.status(200).json(data)
            })
        } else {

          Model.findOneAndUpdate({ _id: req.params.id }, { $pull: { upvotes: req.userId } }, { useFindAndModify: true, new: true })
            .then(data => {
              res.status(200).json(data)
            })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static downvote(req, res) {
    Model.findOne({
      $and: [
        { downvotes: req.userId },
        { _id: req.params.id }
      ]
    })
      .then(data => {
        if (!data) {
          Model.findByIdAndUpdate(req.params.id, { $pull: { upvotes: req.userId }, $push: { downvotes: req.userId } }, { useFindAndModify: true, new: true })
            .then(data => {
              res.status(200).json(data)
            })
        } else {
          Model.findByIdAndUpdate(req.params.id, { $pull: { downvotes: req.userId } }, { useFindAndModify: true, new: true })
            .then(data => {
              res.status(200).json(data)
            })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = Question