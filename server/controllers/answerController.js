const Answer = require('../models/answerModel')

class AnswerController {
    static create(req, res, next) {
        let { content, author, questionId } = req.body
        Answer.create({
            content, author, questionId
        })
        .then((newAnswer) => {
            res.status(201).json(newAnswer)
        })
        .catch((err) => {
            next(err)
        })
    }

    static gets(req, res, next) {
        Answer.find({})
        .populate('author')
        .populate('questionId')
        .then((answers) => {
            res.status(200).json(answers)
        })
        .catch((err) => {
            next(err)
        })
    }
    
    static delete(req, res, next) {
        Answer.findByIdAndDelete(req.params.id)
        .then((deleted) => {
            res.status(200).json(deleted)
        })
        .catch((err) => {
            next(err)
        })
    }

    static edit(req, res, next) {
        let input = req.body
        let id = req.params.id
        Answer.findByIdAndUpdate(id, input, { new: true })
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((err) => {
            next(err)
        })
    }

    static upvote(req, res, next) {
        let { upvote } = req.body
        Answer.findByIdAndUpdate(req.params.id, {
            upvote
        })
        .then((upvoted) => {
            res.status(200).json(upvoted)
        })
        .catch((err) => {
            next(err)
        })
    }

}

module.exports = AnswerController