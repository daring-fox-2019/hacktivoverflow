const Question = require('../models/Question')

module.exports = {
    addQuestion(req, res, next) {
        let id = req.body.userId
        let question = req.body.question
        let description = req.body.description
        let watchTags = req.body.watchTags
        Question.create({
                question,
                description,
                owner: id,
                watchTags,
                createdAt: new Date().toLocaleDateString({
                    timezone: 'Asia/Jakarta'
                }) + " " + new Date().toLocaleTimeString({
                    timezone: 'Asia/Jakarta'
                }),
                updatedAt: new Date().toLocaleDateString({
                    timezone: 'Asia/Jakarta'
                }) + " " + new Date().toLocaleTimeString({
                    timezone: 'Asia/Jakarta'
                }),
                views: 0
            })
            .then(questionAdded => {
                res.status(201).json(questionAdded)
            })
            .catch(err => {
                next(err)
            })
    },
    showAllQuestions(req, res, next) {
        //buat untuk find by
        if (req.query.tag) {
            query = {
                'watchTags': {
                    $elemMatch: {
                        0: req.query.tag
                    }
                }
            }
        } else {
            query = {}
        }
        console.log(query)
        Question.find(query)
            .populate('answers')
            .populate('owner')
            .then(allQuestions => {
                console.log(allQuestions, 'hehey')
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
        console.log(watchTags, 'cocok')
        Question.findOne({
                _id: questionId
            })
            .then(questionRes => {
                let upvotes = questionRes.upvotes
                let downvotes = questionRes.downvotes
                let answers = questionRes.answers
                let owner = questionRes.owner
                let createdAt = questionRes.createdAt
                let views = questionRes.views
                Question.updateOne({
                        _id: questionId
                    }, {
                        watchTags,
                        question,
                        description,
                        upvotes,
                        downvotes,
                        answers,
                        owner,
                        createdAt,
                        updatedAt: new Date().toLocaleDateString({
                            timezone: 'Asia/Jakarta'
                        }) + " " + new Date().toLocaleTimeString({
                            timezone: 'Asia/Jakarta'
                        }),
                        views 

                    })
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
        Question.deleteOne({
                _id: questionId
            })
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
        Question.findOne({
                _id: questionId
            })
            .then(question => {
                if (!question) {
                    res.status(400).json('please check your input' + " ==== " + question)
                }
                if ((question.downvotes.filter(el => el == id)).length !== 0) {
                    Question.findOneAndUpdate({
                            _id: questionId
                        }, {
                            $pullAll: {
                                downvotes: [id]
                            }
                        })
                        .then(result => {
                            return Question.updateOne({
                                    _id: questionId
                                }, {
                                    $push: {
                                        upvotes: id
                                    }
                                })
                                .then(report => {
                                    res.status(201).json(`You have successfully upvote this question!: ${report}`)
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else if ((question.upvotes.filter(el => el == id)).length !== 0) {
                    Question.findOneAndUpdate({
                            _id: questionId
                        }, {
                            $pullAll: {
                                upvotes: [id]
                            }
                        })
                        .then(result => {
                            return Question.updateOne({
                                    _id: questionId
                                }, {
                                    $push: {
                                        upvotes: id
                                    }
                                })
                                .then(report => {
                                    res.status(201).json(`You have successfully upvote this question!: ${report}`)
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    return Question.updateOne({
                            _id: questionId
                        }, {
                            $push: {
                                upvotes: id
                            }
                        })
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
        Question.findOne({
                _id: questionId
            })
            .then(question => {
                if (!question) {
                    res.status(400).json('please check your input' + " ==== " + question)
                }
                if ((question.downvotes.filter(el => el == id)).length !== 0) {
                    Question.findOneAndUpdate({
                            _id: questionId
                        }, {
                            $pullAll: {
                                downvotes: [id]
                            }
                        })
                        .then(result => {
                            return Question.updateOne({
                                    _id: questionId
                                }, {
                                    $push: {
                                        downvotes: id
                                    }
                                })
                                .then(report => {
                                    res.status(201).json(`You have successfully downvote this question!: ${report}`)
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else if ((question.upvotes.filter(el => el == id)).length !== 0) {
                    Question.findByIdAndUpdate({
                            _id: questionId
                        }, {
                            $pullAll: {
                                upvotes: [id]
                            }
                        })
                        .then(result => {
                            console.log(result)
                            return Question.updateOne({
                                    _id: questionId
                                }, {
                                    $push: {
                                        downvotes: id
                                    }
                                })
                                .then(report => {
                                    res.status(201).json(`You have successfully downvote this question!: ${report}`)
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    return Question.updateOne({
                            _id: questionId
                        }, {
                            $push: {
                                downvotes: id
                            }
                        })
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
        Question.updateOne({
                _id: questionId
            }, {
                $push: {
                    answers: id
                }
            })
            .then(report => {
                res.status(201).json(report)
            })
            .catch(err => {
                console.log(err, 'terjadi error')
            })
    },
    getAllTags(req,res){
        Question.distinct('watchTags', function(err,tags){
            if(err){
                next(err)
            } else {
                res.status(200).json(tags)
            }
        })
    }
}