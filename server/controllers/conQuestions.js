const QuestionModel = require('../models/Question')

module.exports = {
    addQuestion(req, res, next) {
        let id = req.body.userId
        let question = req.body.question
        let description = req.body.description
        let watchTags = req.body.watchTags
        QuestionModel.addQuestion(id, question, description, watchTags)
            .then(questionAdded => {
                res.status(201).json(questionAdded)
            })
            .catch(err => {
                next(err)
            })
    },
    showAllQuestions(req, res, next) {
        QuestionModel.showAllQuestions()
            .then(allQuestions => {
                res.status(200).json(allQuestions)
            })
            .catch(err => {
                next(err)
            })
    },
    updatePutQuestion(req, res, next) {
        let questionId = req.params.id
        let question = req.body.question
        let description = req.body.description
        let watchTags = req.body.watchTags
        QuestionModel.showOneQuestion(questionId)
            .then(questionRes => {
                let upvotes = questionRes.upvotes
                let downvotes = questionRes.downvotes
                let answers = questionRes.answers
                let owner = questionRes.owner
                QuestionModel.updatePutQuestion(questionId, question, description, upvotes, downvotes, answers, owner, watchTags)
                    .then(result => {
                        res.status(201).json(result)
                    })
                    .catch(err => {
                        next(err)
                    })
            })
    },
    deleteQuestion(req, res, next) {
        let questionId = req.params.id
        QuestionModel.deleteQuestion(questionId)
            .then(deleteReport => {
                res.status(200).json(deleteReport)
            })
            .catch(err => {
                next(err)
            })
    },
    upvote(req, res, next) {
        let id = req.body.userId
        let questionId = req.params.id
        QuestionModel.showOneQuestion(questionId)
            .then(question => {
                if (!question) {
                    res.status(400).json('please check your input' + " ==== " + question)
                }
                if ((question.downvotes.filter(el => el == id)).length !== 0) {
                    QuestionModel.Question.findOneAndUpdate({_id:questionId},{$pullAll: {downvotes: [id]}})
                    .then(result => {
                        return QuestionModel.upvote(questionId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully upvote this question!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else if ((question.upvotes.filter(el => el == id)).length !== 0){
                    QuestionModel.Question.findByIdAndUpdate({_id:questionId},{$pullAll: {upvotes: [id]}})
                    .then(result => {
                        console.log(result)
                        return QuestionModel.upvote(questionId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully upvote this question!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                else {
                    return QuestionModel.upvote(questionId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully upvote this question!: ${report}`)
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    },
    downvote(req, res, next) {
        let id = req.body.userId
        let questionId = req.params.id
        QuestionModel.showOneQuestion(questionId)
            .then(question => {
                if (!question) {
                    res.status(400).json('please check your input' + " ==== " + question)
                }
                if ((question.downvotes.filter(el => el == id)).length !== 0) {
                    QuestionModel.Question.findOneAndUpdate({_id:questionId},{$pullAll: {downvotes: [id]}})
                    .then(result => {
                        return QuestionModel.downvote(questionId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully downvote this question!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else if ((question.upvotes.filter(el => el == id)).length !== 0){
                    QuestionModel.Question.findByIdAndUpdate({_id:questionId},{$pullAll: {upvotes: [id]}})
                    .then(result => {
                        console.log(result)
                        return QuestionModel.downvote(questionId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully downvote this question!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                else {
                    return QuestionModel.downvote(questionId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully downvote this question!: ${report}`)
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    },
    addAnswer(id, questionId, req, res, next) {
        QuestionModel.addAnswer(id, questionId)
            .then(report => {
                console.log(report)
                res.status(201).json(report)
            })
            .catch(err => {
                console.log(err, 'terjadi error')
            })
    }
}