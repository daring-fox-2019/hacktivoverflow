const AnswerModel = require('../models/Answer')
const conQuestions = require('../controllers/conQuestions')

module.exports = {
    addAnswer(req, res, next) {
        let id = req.body.userId
        let questionId = req.body.questionId
        let answer = req.body.answer
        let description = req.body.description
        AnswerModel.addAnswer(id, questionId, answer, description)
            .then(answerAdded => {
                conQuestions.addAnswer(answerAdded._id,questionId,req,res,next)
            })
            .catch(err => {
                next(err)
            })
    },
    showAllAnswers(req, res, next) {
        AnswerModel.showAllAnswers()
            .then(allAnswers => {
                res.status(200).json(allAnswers)
            })
            .catch(err => {
                next(err)
            })
    },
    updatePutAnswer(req, res, next) {
        let answerId = req.params.id
        let answer = req.body.answer
        let description = req.body.description
        AnswerModel.showOneAnswer(answerId)
            .then(answerRes => {
                let upvotes = answerRes.upvotes
                let downvotes = answerRes.downvotes
                let question = answerRes.question
                let owner = answerRes.owner
                return AnswerModel.updatePutAnswer(answerId, answer, description, upvotes, downvotes, question, owner)
                    .then(result => {
                        res.status(201).json(result)
                    })
            })
            .catch(err => {
                next(err)
            })
    },
    deleteAnswer(req, res, next) {
        let answerId = req.params.id
        AnswerModel.deleteAnswer(answerId)
            .then(deleteReport => {
                res.status(200).json(deleteReport)
            })
            .catch(err => {
                next(err)
            })
    },
    upvote(req, res, next) {
        let id = req.body.userId
        let answerId = req.params.id
        AnswerModel.showOneAnswer(answerId)
            .then(answer => {
                if (!answer) {
                    res.status(400).json('please check your input' + " ==== " + answer)
                }
                if ((answer.downvotes.filter(el => el == id)).length !==0 ) {
                    AnswerModel.Answer.findOneAndUpdate({_id:answerId},{$pullAll: {downvotes: [id]}})
                    .then(result => {
                        return AnswerModel.upvote(answerId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully upvote this answer!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else if((answer.upvotes.filter(el => el == id)).length!==0){
                    AnswerModel.Answer.findByIdAndUpdate({_id:answerId},{$pullAll: {upvotes: [id]}})
                    .then(result => {
                        console.log(result)
                        return AnswerModel.upvote(answerId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully upvote this answer!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }else {
                    return AnswerModel.upvote(answerId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully upvote this answer!: ${report}`)
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    },
    downvote(req, res, next) {
        let id = req.body.userId
        let answerId = req.params.id
        AnswerModel.showOneAnswer(answerId)
            .then(answer => {
                if (!answer) {
                    res.status(400).json('please check your input' + " ==== " + answer)
                }
                if ((answer.downvotes.filter(el => el == id)).length !==0) {
                    AnswerModel.Answer.findOneAndUpdate({_id:answerId},{$pullAll: {downvotes: [id]}})
                    .then(result => {
                        return AnswerModel.downvote(answerId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully downvote this answer!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else if((answer.upvotes.filter(el => el == id)).length!==0){
                    AnswerModel.Answer.findByIdAndUpdate({_id:answerId},{$pullAll: {upvotes: [id]}})
                    .then(result => {
                        console.log(result)
                        return AnswerModel.downvote(answerId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully downvote this answer!: ${report}`)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else {
                    return AnswerModel.downvote(answerId, id)
                        .then(report => {
                            res.status(201).json(`You have successfully downvote this answer!: ${report}`)
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}