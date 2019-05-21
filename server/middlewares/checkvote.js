const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
    checkUpvoteQuestion(req, res, next) {
        const _id = req.params.id
        const upvotes = req.decoded._id

        Question.findOne({_id, upvotes})
        .then(found => {
            if(found) {
                res.status(400).json({
                    message: 'Already in the upvote',
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error checking question upvote'
            })
        })
    },
    checkDownvoteQuestion(req, res, next) {
        const _id = req.params.id
        const downvotes = req.decoded._id

        Question.findOne({_id, downvotes})
        .then(found => {
            if(found) {
                res.status(400).json({
                    message: 'Already in the downvote',
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error checking question downvote'
            })
        })
    },
    checkUpvoteAnswer(req, res, next) {
        const _id = req.params.id
        const upvotes = req.decoded._id
        Answer.findOne({_id, upvotes})
        .then(found => {
            if(found) {
                res.status(400).json({
                    message: 'Already in the upvote',
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error checking answer upvote'
            })
        })
    },
    checkDownvoteAnswer(req, res, next) {
        const _id = req.params.id
        const downvotes = req.decoded._id
        Answer.findOne({_id, downvotes})
        .then(found => {
            if(found) {
                res.status(400).json({
                    message: 'Already in the downvote',
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error checking answer downvote'
            })
        })
    },
}