const jwt = require('jsonwebtoken')
const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
  authentication: function(req, res, next) {
    if (!req.headers.token) {
      res.status(401).json({errors: 'You must login first'})
    } else {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
      req.authUser = decoded
      next()
    }
  },

  authorizationQuestion: function(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    
    Question
      .findById(req.params.id)
      .then(question => {
        if (question.questioner == decoded._id) {
          next()
        } else {
          res.status(401).json({errors: 'You not authorized'})
        }
      })
      .catch(err => {
        res.status(500).json({error: 'You not authorized'})
      })
  }, 

  authorizationAnswer: function(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    // console.log(decoded);
    // console.log(req.params.id);
    Answer
      .findById(req.params.id)
      .then(answer => {
        if (answer.responder == decoded._id) {
          next()
        } else {
          res.status(401).json({errors: 'You not authorized'})
        }
      })
      .catch(err => {
        res.status(500).json({error: 'You not authorized'})
      })
  }
}