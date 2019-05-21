const dotenv = require('dotenv')
const Question = require('../models/Question')
const User = require('../models/User')
const Answer = require('../models/Answer')
const jwt2 = require('../helpers/jwt')
dotenv.config()

module.exports ={
    Authenticate: (req,res,next) => {
        let jwtoken = req.headers.jwtoken
        try {
            let decoded = jwt2.verifyToken(jwtoken)
            if(decoded){
                User.findOne({_id: decoded.id})
                .then(data => {
                    if(data){
                        req.body.userId = decoded.id
                        next()
                    } else {
                        res.status(400).json("you're not authenticated!")
                    }
                })
            }
        } catch (err) {
            res.status(401).json(err)
        }
    },
    Authorize: {
        updatePutQuestion: (req,res,next) => {
            let userId = req.body.userId
            let questionId = req.params.id
            Question.findOne({_id: questionId})
            .then(question => {
                if((question!==null)&&(question.owner == userId)){
                    next()
                } else {
                    res.status(401).json("You're not authorized")
                }
            })
            .catch(err => {
                next(err)
            })
        },
        deleteQuestion: (req,res,next) => {
            let userId = req.body.userId
            let id = req.params.id
            Question.findOne({_id: id})
            .then(question => {
                if(question == null){
                    res.status(400).json(question, "Your request is bad!")
                } else if(question.owner == userId){
                    next()
                } else {
                    res.status(401).json("You're not authorized")
                }
            })
            .catch(err => {
                next(err)
            })
        },
        updatePutAnswer: (req,res,next) => {
            let userId = req.body.userId
            let answerId = req.params.id
            Answer.findOne({_id: answerId})
            .then(answer => {
                if((answer!==null)&&(answer.owner == userId)){
                    next()
                } else {
                    res.status(401).json("You're not authorized")
                }
            })
            .catch(err => {
                next(err)
            })
        },
        deleteAnswer: (req,res,next) => {
            let userId = req.body.userId
            let id = req.params.id
            Answer.findOne({_id: id})
            .then(answer => {
                if(answer == null){
                    res.status(400).json(answer, "Your request is bad!")
                } else if(answer.owner == userId){
                    next()
                } else {
                    res.status(401).json("You're not authorized")
                }
            })
            .catch(err => {
                next(err)
            })
        }
    }
}