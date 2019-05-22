const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
const { verify } = require('../helpers/jwt')

function authentication(req, res, next) {
  let decoded = verify(req.headers.token);
  
  User.findOne({ email: decoded.email })
    .then(userFound => {
      if (userFound) {
        req.userId = userFound._id
        next()
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    })
    .catch(err => {
      res.status(401).json({ message: 'Unauthorized' })
    })

}

function authorizationQuestion(req, res, next) {
  Question.findOne({ _id: req.params.id })
    .then(data => {
      if (String(data.userId) === String(req.userId)) {
        next()
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    })
    .catch(err => {
      res.status(401).json({ message: 'Unauthorized' })
    })
}

function authorizationAnswer(req, res, next) {
  Answer.findOne({ _id: req.params.id })
    .then(data => {
      if (String(data.userId) === String(req.userId)) {
        next()
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    })
    .catch(err => {
      res.status(401).json({ message: 'Unauthorized' })
    })
}

module.exports = { authentication, authorizationQuestion, authorizationAnswer }
