const Answer = require('../models/Answer')

class AnswerController {
    static create(req, res) {
        const { description, user, answer } = req.body
        Answer
            .create({
                description,
                upvote: [],
                downvote: [],
                user,
                answer,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then(answer => {
                res.status(201).json(answer)
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
            .find()
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