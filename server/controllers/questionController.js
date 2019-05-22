const Question = require("../models/Question")
const User = require("../models/User")
const Answer = require("../models/Answer")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

class questionController {

    static getAllQuestion(req, res) {
        Question.find({})
            .populate('author')
            .sort({
                createdAt: -1
            })
            .then(found => {
                res.json(found)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static getOneQuestion(req, res) {
        Question.findById(req.params.questionId)
            .populate('author')
            .populate({
                path: 'answers',
                populate: {
                    path: 'author',
                    model: 'User'
                }
            })
            .then(found => {
                if (found) {
                    res.json(found)
                } else {
                    res.status(404).json({
                        msg: "question not found"
                    })
                }
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static askQuestion(req, res) {
        let question = new Question({
            author: req.loggedUser.id,
            createdAt: moment().format(),
            title: req.body.title,
            body: req.body.body,
            solved: false,
            upvotes: [],
            downvotes: [],
            answers: []
        })
        Promise.all([question.save(), User.findById(req.loggedUser.id)])
            .then(data => {
                let newArr = data[1].questions
                newArr.push(data[0].id)
                return data[1].updateOne({
                    $set: {
                        questions: newArr
                    }
                })
            }).then(saved => {
                res.json(saved)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static async getAllAnswers(req, res) {
        try {
            let question = await Question.findById(req.params.questionId)
                .populate({
                    path: 'answers',
                    populate: {
                        path: 'author',
                        model: 'User'
                    }
                })
            res.json(question.answers)
        } catch (error) {
            res.status(500).json(error.errors)
        }
    }

    static createAnswer(req, res) {
        let answer = new Answer({
            createdAt: moment().format(),
            author: req.loggedUser.id,
            upvotes: [],
            downvotes: [],
            title: req.body.title,
            body: req.body.body
        })
        Promise.all([Question.findById(req.params.questionId), answer.save()])
            .then(data => {
                let arr = data[0].answers
                arr.push(data[1].id)
                return data[0].updateOne({
                    $set: {
                        answers: arr
                    }
                })
            }).then(saved => {
                res.json(saved)
            })
            .catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static async getOneAnswer(req, res) {
        try {
            let answer = await Answer.findById(req.params.answerId)
            if (answer) {
                res.json(answer)
            } else {
                res.status(404).json({
                    msg: "answer not found"
                })
            }
        } catch (error) {
            res.status(500).json(error.errors)
        }
    }

    static editQuestion(req, res) {
        Question.findById(req.params.questionId)
            .then(found => {
                if (found) {
                    return found.updateOne({
                        $set: {
                            title: req.body.title,
                            body: req.body.body
                        }
                    })
                } else {
                    res.status(404).json({
                        msg: "question not found"
                    })
                }
            }).then(updated => {
                res.json(updated)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static editAnswer(req, res) {
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) {
                    return found.updateOne({
                        $set: {
                            title: req.body.title,
                            body: req.body.body
                        }
                    })
                } else {
                    res.status(404).json({
                        msg: "answer not found"
                    })
                }
            }).then(edited => {
                res.json(edited)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static deleteQuestion(req, res) {
        console.log(req.params.questionId, 'masuk ke sini');
        Question.findById(req.params.questionId)
            .then(result => {
                return Promise.all([Answer.deleteMany({
                        "_id": result.answers
                    }),
                    Question.findByIdAndDelete(req.params.questionId)
                ])
            }).then(success => {
                res.json(success)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static deleteAnswer(req, res) {
        Promise.all([Answer.findByIdAndDelete(req.params.answerId),
                Question.updateOne({
                    "_id": req.params.questionId
                }, {
                    $pull: {
                        "answers": req.params.answerId
                    }
                })
            ])
            .then(success => {
                res.json(success)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static upvoteQuestion(req, res) {
        console.log(req.params.questionId);
        Question.findById(req.params.questionId)
            .then(found => {
                if (found) {
                    console.log('question found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser.id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser.id)
                    if (checkInDownvotes !== -1) { // berarti ketemu
                        console.log('downvotes: exists');
                        found.downvotes.splice(checkInDownvotes, 1)
                        found.upvotes.push(req.loggedUser.id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('downvote: not exist');
                        if (checkInUpvotes === -1) {
                            console.log('upvotes: not exist');
                            found.upvotes.push(req.loggedUser.id)
                            console.log('status: upvoted');
                            return found.save()
                        } else {
                            found.upvotes.splice(checkInUpvotes, 1)
                            return found.save()
                        }
                    }
                } else {
                    console.log('question not found');
                    console.log('returning 404');
                    res.status(404).json({
                        msg: "question not found"
                    })
                }
            }).then(success => {
                res.json(success)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static downvoteQuestion(req, res) {
        console.log(req.params.questionId);
        Question.findById(req.params.questionId)
            .then(found => {
                if (found) {
                    console.log('question found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser.id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser.id)
                    if (checkInUpvotes !== -1) { // berarti ketemu
                        console.log('upvotes: exists');
                        found.upvotes.splice(checkInUpvotes, 1)
                        found.downvotes.push(req.loggedUser.id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('upvote: not exist');
                        if (checkInDownvotes === -1) {
                            console.log('downvotes: not exist');
                            found.downvotes.push(req.loggedUser.id)
                            console.log('status: downvoted');
                            return found.save()
                        } else {
                            found.downvotes.splice(checkInDownvotes, 1)
                            return found.save()
                        }
                    }
                } else {
                    console.log('question not found');
                    console.log('returning 404');
                    res.status(404).json({
                        msg: "question not found"
                    })
                }
            }).then(success => {
                res.json(success)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static upvoteAnswer(req, res) {
        console.log(req.params.answerId);
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) {
                    console.log('answer found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser.id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser.id)
                    if (checkInDownvotes !== -1) { // berarti ketemu
                        console.log('downvotes: exists');
                        found.downvotes.splice(checkInDownvotes, 1)
                        found.upvotes.push(req.loggedUser.id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('downvote: not exist');
                        if (checkInUpvotes === -1) {
                            console.log('upvotes: not exist');
                            found.upvotes.push(req.loggedUser.id)
                            console.log('status: upvoted');
                            return found.save()
                        } else {
                            found.upvotes.splice(checkInUpvotes, 1)
                            return found.save()
                        }
                    }
                } else {
                    console.log('answer not found');
                    console.log('returning 404');
                    res.status(404).json({
                        msg: "answer not found"
                    })
                }
            }).then(success => {
                res.json(success)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static downvoteAnswer(req, res) {
        console.log(req.params.answerId);
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) {
                    console.log('answer found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser.id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser.id)
                    if (checkInUpvotes !== -1) { // berarti ketemu
                        console.log('upvotes: exists');
                        found.upvotes.splice(checkInUpvotes, 1)
                        found.downvotes.push(req.loggedUser.id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('upvote: not exist');
                        if (checkInDownvotes === -1) {
                            console.log('downvotes: not exist');
                            found.downvotes.push(req.loggedUser.id)
                            console.log('status: downvoted');
                            return found.save()
                        } else {
                            found.downvotes.splice(checkInDownvotes, 1)
                            return found.save()
                        }
                    }
                } else {
                    console.log('answer not found');
                    console.log('returning 404');
                    res.status(404).json({
                        msg: "answer not found"
                    })
                }
            }).then(success => {
                res.json(success)
            }).catch(error => {
                res.status(500).json(error.errors)
            })
    }

    static markAsSolved(req, res) {
        Question.findByIdAndUpdate(req.params.questionId, {
            $set: {
                solved: true
            }
        }).then(success => {
            res.json(success)
        }).catch(error => {
            res.status(500).json(error.errors)
        })
    }

    static markAsUnsolved(req, res) {
        Question.findByIdAndUpdate(req.params.questionId, {
            $set: {
                solved: false
            }
        }).then(success => {
            res.json(success)
        }).catch(error => {
            res.status(500).json(error.errors)
        })
    }

}

module.exports = questionController