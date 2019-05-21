const Question = require('../models/Question')

class QuestionController {
    static create(req, res) {
        const { title, description, user } = req.body
        Question
            .create({
                title,
                description,
                upvote: [],
                downvote: [],
                user,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        Question
            .findOne({ _id: req.params.id })
            .populate('upvote')
            .populate('downvote')
            .populate('user')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Question
            .find()
            .populate('upvote')
            .populate('downvote')
            .populate('user')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = QuestionController