const { Question, Answer } = require('../models')
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");

class QuestionController{
  static create(req,res){
    let decode = decodeJWT(req.headers.token)
    let newQuestion = new Question({
      title: req.body.title,
      content: req.body.content,
      userId: decode.id
    });
    newQuestion.save()
    .then(question=>{
      res.status(201).json(question)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  
  static findAll(req,res){
    Question.find(req.query)
    .populate('userId','-password')
    .sort('-createdAt')
    .then(questions=>{
      res.status(200).json(questions)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }

  static update(req,res){
    Question.findOneAndUpdate({
      _id: req.body.id
    },{
      title: req.body.title,
      content: req.body.content
    },{new: true})
    .then(updated=>{
      console.log(updated)
      res.status(200).json(updated)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  static delete(req,res){
    let question
    Question.findByIdAndDelete(req.params.id)
    .then(deleted=>{
      question = deleted
      Answer.deleteMany({questionId: deleted._id})
      .then(deleted=>{
        res.status(200).json(question)
      })
      .catch(err=>{
        throw err
      })
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }

  static vote(req,res){
    let decode = decodeJWT(req.headers.token)
    let result = ''
    Question.findById(req.params.id)
    .then(question=>{
      if(req.body.type === 'upvote'){
        if(question.upvotes.includes(decode.id)){
          // pull up vote
          question.upvotes.pull(decode.id)
          result = 'remove upvote'
        }else{
          if (question.downvotes.includes(decode.id)){
            question.downvotes.pull(decode.id)
          }
          question.upvotes.push(decode.id)
          result = 'push upvote'
        }
      }else if(req.body.type === 'downvote'){
        if (question.downvotes.includes(decode.id)){
          question.downvotes.pull(decode.id)
          result = 'remove downvote'
        }else{
          if (question.upvotes.includes(decode.id)){
            question.upvotes.pull(decode.id)
          }
          question.downvotes.push(decode.id)
          result = 'push downvote'
        }
      }
      return question.save()
    })
    .then(saved=>{
      res.status(200).json({
        saved: saved,
        result: result
      })
    })
    .catch(err=>{
      console.log(err.message)
      res.status(500).json({
        msg: err.message
      })
    })
  }

  static search(req, res) {
    let { title } = req.query;
    let obj = {};
    if (title) {
      title = new RegExp(`.*${title}.*`, "i");
      obj = { $or: [{ title: title }] };
      Question.find(obj)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(err => {
          res.status(500).json({
            msg: err.message
          });
        });
    }else{
      res.status(200).json([])
    }
  }
}
module.exports = QuestionController