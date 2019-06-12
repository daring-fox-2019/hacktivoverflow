const Question = require('../models/question')
const User = require('../models/user')
const Answer = require('../models/answer')

class AnswerController {
  static create(req,res){
    Answer.create({
      question: req.params.questionid,
      user: req.decoded._id,
      title: req.body.title,
      description: req.body.description,
    })
    .then(row =>{
      return Question.findByIdAndUpdate(row.question,{
        $push: { answers: row._id },
      })
    })
    .then(row =>{
      return User.findByIdAndUpdate(row.user,{
        $push: { answers: row._id },
      })
    })
    .then(row =>{
      res.status(201).json(row)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: err
      })
    })
  }
  static read(req,res){
    Answer.find({question: req.params.questionid})
    .then(rows =>{
      res.status(200).json(rows)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static search(req,res){
    if(req.query.title) obj.title = { '$regex' : req.query.title, '$options' : 'i' }
    Answer.find(obj)
    .then(rows=>{
      res.status(200).json(rows)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static readOne(req,res){
    Answer.findOne({
      _id: req.params._id
    })
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static update(req,res){
    Answer.findById(req.params._id)
    .then(row =>{
      row.title = req.body.title || row.title
      row.description = req.body.description || row.description
      let foundUpvotes = row.upvotes.filter(userId => userId.equals(req.decoded._id))
      let foundDownvotes = row.downvotes.filter(userId => userId.equals(req.decoded._id))
      if(req.body.voteType == 'upvote') {
        if(foundUpvotes.length > 0)
          res.status(400).json({
            message: "User already voted"
          })
        else {
          if(foundDownvotes.length > 0)
            row.downvotes = row.downvotes.filter(userId => !userId.equals(req.decoded._id))
          row.upvotes.push(req.decoded._id)
        }
      }
      else {
        if(foundDownvotes.length > 0)
          res.status(400).json({
            message: "User already voted"
          })
        else {
          if(foundUpvotes.length > 0)
            row.upvotes = row.upvotes.filter(userId => !userId.equals(req.decoded._id))
          row.downvotes.push(req.decoded._id)
        }
      }
      return row.save()
    })
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static delete(req,res){
    Answer.findByIdAndDelete(req.params._id)
    .then(row=>{
      return Question.findByIdAndUpdate(row.question,{
        $pull: { answers: row._id },
      })
    })
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
}

module.exports = AnswerController