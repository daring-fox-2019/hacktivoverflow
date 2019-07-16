const { Answer,User } = require('../models')
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");

class AnswerController{
  static create(req,res){
    let decode = decodeJWT(req.headers.token)
    let newAnswer = new Answer({
      content: req.body.content,
      userId: decode.id,
      questionId: req.body.questionId,
    })
    newAnswer.save()
    .then(answer=>{
      res.status(201).json(answer);
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }

  static find(req,res){
    Answer.find(req.query)
    .populate('userId')
    .then(answers=>{
      res.status(200).json(answers)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }

  static update(req,res){
    Answer.findOneAndUpdate({
      _id: req.body.id
    },
    {
      content: req.body.content
    },{new: true})
    .then(updated=>{
      res.status(200).json(updated)
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
    Answer.findById(req.params.id)
    .then(answer=>{
      if(req.body.type === 'upvote'){
        if(answer.upvotes.includes(decode.id)){
          // pull up vote
          answer.upvotes.pull(decode.id)
          result = 'remove upvote'
        }else{
          if (answer.downvotes.includes(decode.id)){
            answer.downvotes.pull(decode.id)
          }
          answer.upvotes.push(decode.id)
          result = 'push upvote'
        }
      }else if(req.body.type === 'downvote'){
        if (answer.downvotes.includes(decode.id)){
          answer.downvotes.pull(decode.id)
          result = 'remove downvote'
        }else{
          if (answer.upvotes.includes(decode.id)){
            answer.upvotes.pull(decode.id)
          }
          answer.downvotes.push(decode.id)
          result = 'push downvote'
        }
      }
      return answer.save()
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
}

module.exports = AnswerController