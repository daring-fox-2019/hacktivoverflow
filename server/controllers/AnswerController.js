const Answer = require('../models/Answer')

class AnswerController {
    static create(req, res) {
        const { answer, questionId } = req.body
        Answer
            .create({
                description: answer,
                upvote: [],
                downvote: [],
                user: req.decoded._id,
                question: questionId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then(answer => {
                answer.populate('user').populate('question', err => {
                    res.status(201).json(answer)
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        Answer
            .findOneAndUpdate(
                { _id: req.params.id },
                { description: Object.keys(req.body)[0] },
                { new: true })
            .populate('upvote')
            .populate('downvote')
            .populate('user')
            .populate('question')
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Answer
            .findOneAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        Answer
            .findOne({ _id: req.params.id })
            .populate('upvote')
            .populate('downvote')
            .populate('user')
            .populate('question')
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Answer
            .find({ question: req.params.id })
            .populate('upvote')
            .populate('downvote')
            .populate('user')
            .populate('question')
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = AnswerController