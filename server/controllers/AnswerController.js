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

    static upvote(req, res) {
        Answer
            .findOne({ _id: req.params.id })
            .populate('user')
            .then(answer => {
                let count = 0
                answer.upvotes.find(el => {
                    if (el == req.decoded._id) { count += 2 }
                })
                answer.downvotes.find((el, i) => {
                    if (el == req.decoded._id) { count++ }
                })
                if (count === 0) {
                    answer.upvotes.push(req.decoded._id)
                    answer.save()
                    res.status(200).json(answer)
                } else if (count === 1) {
                    answer.downvotes.pull(req.decoded._id)
                    answer.upvotes.push(req.decoded._id)
                    answer.save()
                    res.status(200).json(answer)
                } else {
                    answer.upvotes.pull(req.decoded._id)
                    answer.save()
                    res.status(200).json(answer)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static downvote(req, res) {
        Answer
            .findOne({ _id: req.params.id })
            .populate('user')
            .then(answer => {
                let count = 0
                answer.downvotes.find(el => {
                    if (el == req.decoded._id) { count += 2 }
                })
                answer.upvotes.find((el, i) => {
                    if (el == req.decoded._id) { count++ }
                })
                if (count === 0) {
                    answer.downvotes.push(req.decoded._id)
                    answer.save()
                    res.status(200).json(answer)
                } else if (count === 1) {
                    answer.upvotes.pull(req.decoded._id)
                    answer.downvotes.push(req.decoded._id)
                    answer.save()
                    res.status(200).json(answer)
                } else {
                    answer.downvotes.pull(req.decoded._id)
                    answer.save()
                    res.status(200).json(answer)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = AnswerController