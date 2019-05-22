const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports.AuthorizeQuestion = (req, res, next) => {
  console.log("AuthorizeQuestion",req.decoded._id)
  Question.findOne({
    user: req.decoded._id
  })
  .then(row =>{
    console.log(row)
    if(row){
      next()
    }
    else{
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  })
  .catch(err =>{
    res.status(500).json({
      message: "Authorize catch",
      err
    })
  })
}
module.exports.AuthorizeAnswer = (req, res, next) => {
  console.log("AuthorizeAnswer",req.decoded._id)
  Answer.findOne({
    user: req.decoded._id
  })
  .then(row =>{
    console.log(row)
    if(row){
      next()
    }
    else{
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  })
  .catch(err =>{
    res.status(500).json({
      message: "Authorize catch",
      err
    })
  })
}