const Question = require('../models/question')
const User = require('../models/user')

class QuestionController {
  static create(req,res){
    let _id
    Question.create({
      user: req.decoded._id,
      title: req.body.title,
      description: req.body.description,
    })
    .then(row=>{
      _id = row._id
      return User.findByIdAndUpdate(row.user,{
        $push: { questions: row._id },
      })
    })
    .then(row =>{
      res.status(201).json({_id})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Failed to create new Question",
        err
      })
    })
  }
  static read(req,res){
    Question.find({})
    .populate('answers')
    .then(rows =>{
      res.status(200).json(rows)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Questions",
        err
      })
    })
  }
  static search(req,res){
    // let obj = { _id: req.decoded._id }
    if(req.query.title) obj.title = { '$regex' : req.query.title, '$options' : 'i' }
    Question.find(obj)
    .populate('answers')
    .then(rows=>{
      res.status(200).json(rows)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to search Questions",
        err
      })
    })
  }
  static readOne(req,res){
    Question.findOne({
      _id: req.params._id
    })
    .populate('answers')
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read one Question",
        err
      })
    })
  }
  static update(req,res){
    Question.findById(req.params._id)
    .then(row =>{
      row.title = req.body.title || row.title
      row.description = req.body.description || row.description
      let foundUpvotes = row.upvotes.filter(userId => userId.equals(req.decoded._id))
      let foundDownvotes = row.downvotes.filter(userId => userId.equals(req.decoded._id))
      if(foundUpvotes || foundDownvotes) {
        res.status(400).json({
          message: "User already voted"
        })
      }
      else {
        if(req.body.voteType == 'upvote')
          row.upvotes.push(req.decoded._id)
        else 
          row.downvotes.push(req.decoded._id)
      }
      return row.save()
    })
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update Question",
        err
      })
    })
  }
  static delete(req,res){
    Question.deleteOne({_id: req.params._id})
    .then(row=>{
      return User.findByIdAndUpdate(row.user,{
        $pull: { questions: row._id },
      })
    })
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete Question",
        err
      })
    })
  }
}

module.exports = QuestionController