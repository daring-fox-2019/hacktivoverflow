
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
const { verify } = require('../helpers/jwt')
module.exports = {
    authenticate(req, res, next) {
        if(req.headers.token) {
            const decoded = verify(req.headers.token)
            req.decoded = decoded
            next()
        } else {
            res.status(401).json({
                message: 'please include valid access token'
            })
        }
    },
    questionAuthorization(req, res, next) {
        const _id = req.params.id
        const user = req.decoded._id
        Question.findOne({_id, user})
        .then(found => {
            if(found) {
                next()
            } else {
                res.status(401).json({
                    message: 'Not authorized'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error in authorization - question'
            })
        })
    },
    answerAuthorization(req, res, next) {
        const _id = req.params.id
        const user = req.decoded._id
        Answer.findOne({_id, user})
        .then(found => {
            if(found) {
                next()
            } else {
                res.status(401).json({
                    message: 'Not authorized'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error in authorization - answer'
            })
        })
    }
}