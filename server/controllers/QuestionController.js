const Question = require('../models/Question')

class QuestionController {
    static create(req, res) {
        const { title, description } = req.body
        Question
            .create({
                title,
                description,
                upvote: [],
                downvote: [],
                user: req.decoded._id,
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

    static update(req, res) {
        const { title, description } = req.body
        Question
            .findOneAndUpdate(
                { _id: req.params.id },
                { title, description },
                { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Question
            .findByIdAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static upvote(req, res) {
        Question
            .findOne({ _id: req.params.id })
            .populate('user')
            .then(question => {
                let count = 0
                question.upvotes.find(el => {
                    if (el == req.decoded._id) { count += 2 }
                })
                question.downvotes.find((el, i) => {
                    if (el == req.decoded._id) { count++ }
                })
                if (count === 0) {
                    question.upvotes.push(req.decoded._id)
                    question.save()
                    res.status(200).json(question)
                } else if (count === 1) {
                    question.downvotes.pull(req.decoded._id)
                    question.upvotes.push(req.decoded._id)
                    question.save()
                    res.status(200).json(question)
                } else {
                    question.upvotes.pull(req.decoded._id)
                    question.save()
                    res.status(200).json(question)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static downvote(req, res) {
        Question
            .findOne({ _id: req.params.id })
            .populate('user')
            .then(question => {
                let count = 0
                question.downvotes.find(el => {
                    if (el == req.decoded._id) { count += 2 }
                })
                question.upvotes.find((el, i) => {
                    if (el == req.decoded._id) { count++ }
                })
                if (count === 0) {
                    question.downvotes.push(req.decoded._id)
                    question.save()
                    res.status(200).json(question)
                } else if (count === 1) {
                    question.upvotes.pull(req.decoded._id)
                    question.downvotes.push(req.decoded._id)
                    question.save()
                    res.status(200).json(question)
                } else {
                    question.downvotes.pull(req.decoded._id)
                    question.save()
                    res.status(200).json(question)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = QuestionController