// const { OAuth2Client } = require('google-auth-library')
// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const { wrapAsync, givesError, jwtVerifyToken, generateStringOfNumber } = require('../helpers')
const User = require('../models/user')
const Answer = require('../models/answer')
const Question = require('../models/question')
const Comment = require('../models/comment')

async function authorize(req, res, next) {
    try {
        let token = jwtVerifyToken(req.headers.token)
        let user = await User.findOne({ _id: token._id })
        if (user) {
            req.user = user
            next()
        }
        else {
            next(givesError(401, 'bad token, please properly login to our system'))
        }
    } catch (error) {
        next(error)
    }
}
//only call this after above authorization
async function authorizeOnAnswer(req, res, next) {
    try {
        let answer = await Answer.findOne({_id:req.params.id})
        if (req.user && answer && req.user._id.equals(answer.by)) {            
            req.answer = answer
            next()
        }
        else {
            next(givesError(401, 'you are not the owner of this answer'))
        }
    } catch (error) {
        next(error)
    }
}

async function authorizeOnQuestion(req, res, next) {
    try {
        let question = await Question.findOne({_id:req.params.id})
        if (req.user && question && req.user._id.equals(question.by)) {            
            req.question = question
            next()
        }
        else {
            next(givesError(401, 'you are not the owner of this question'))
        }
    } catch (error) {
        next(error)
    }
}

async function authorizeOnComment(req, res, next) {
    try {
        let comment = await Comment.findOne({_id:req.params.id})
        if (req.user && comment && req.user._id.equals(comment.by)) {            
            req.comment = comment
            next()
        }
        else {
            next(givesError(401, 'you are not the owner of this comment'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authorize,authorizeOnQuestion,authorizeOnAnswer,authorizeOnComment }