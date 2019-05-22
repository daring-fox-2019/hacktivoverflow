const Question = require('../models/questionModel')

class QuestionController {
    static create(req, res, next) {
        let { title, description, author } = req.body
        Question.create({
            title, description, author
        })
        .then((newQuestion) => {
            res.status(200).json(newQuestion)
        })
        .catch((err) => {
            next(err)
        })
    }

    static gets(req, res, next) {
        Question.find({})
        .populate('author')
        .then((questions) => {
            res.status(200).json(questions)
        })
        .catch((err) => {
            next(err)
        })
    }

    static getOne(req, res, next) {
        Question.findById(req.params.id)
        .populate('author')
        .then((question) => {
            res.status(200).json(question)
        })
        .catch((err) => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
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
        Question.findByIdAndUpdate(id, input, { new: true })
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((err) => {
            next(err)
        })
    }

}

module.exports = QuestionController