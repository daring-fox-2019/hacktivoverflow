const Question = require("../models/questionmodel.js")
const Answer = require("../models/answermodel.js")

// let objectId = require("mongodb").ObjectID;

class Controller {
    static getQuestions (req, res) {
            Question.find()
            .exec()
            .then(questions => {
                // console.log(questions)
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }
    static getAnswers (req, res) {
            Answer.find({ question_id: req.params.id })
            .exec()
            .then(answers => {
                // console.log(answers)
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }

    // static readOne (req, res) {
    //     if(req.body.type === "question") {
    //         Question.findById(req.params.id)
    //         .exec()
    //         .then(question => {
    //             res.status(200).json(question)
    //         })
    //         .catch(err => {
    //             res.status(500).json({err})
    //         })
    //     } else if(req.body.type === "answer") {
    //         Answer.find({ author: req.userData.email })
    //         .exec()
    //         .then(questions => {
    //             // console.log(questions)
    //             res.status(200).json(questions)
    //         })
    //         .catch(err => {
    //             res.status(500).json({err})
    //         })
    //     }
    // }

    static create (req, res) {
        if(req.body.type === "question") {
            console.log("Saving question")
            let newQuestion = new Question({
                title: req.body.title,
                content: req.body.content,
                author: req.userData.email,
                created_at: new Date(),
            })
    
            newQuestion.save((err, question) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ err })
                } else {
                    res.status(201).json({
                        message: "Successfully saved question",
                        question,
                    })
                }
            })
        } else if(req.body.type === "answer") {
            console.log("Saving answer")
            let newAnswer = new Answer({
                content: req.body.content,
                author: req.userData.email,
                question_id: req.body.question_id, // relation to question
                created_at: new Date(),
            })
    
            newAnswer.save((err, answer) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ err })
                } else {
                    res.status(201).json({
                        message: "Successfully saved answer",
                        answer,
                    })
                }
            })
        }
    }
    
    static delete (req, res) {
        if(req.body.type === "question") {
            Question.remove({_id: req.params.id})
            .exec()
            .then(deleted => {
                res.status(200).json({
                    message: "Question deleted"
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ err })
            })
        } else if(req.body.type === "answer") {
            Answer.remove({_id: req.params.id})
            .exec()
            .then(deleted => {
                res.status(200).json({
                    message: "Answer deleted"
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ err })
            })
        }
    }

    static update(req, res) {
        if(req.body.type === "question") {
            if(req.body.content) {
                Question.updateOne({_id: req.params.id}, {
                    $set: {
                        content: req.body.content,
                        updated_at: new Date(),
                    }
                })
                .then(question => {
                    res.status(200).json(question)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            } else if(req.body.vote) {
                Question.updateOne({_id: req.params.id}, {
                    $inc: { quantity: req.body.vote },
                    $set: { updated_at: new Date() },
                })
                .then(question => {
                    res.status(200).json(question)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            }
        } else if(req.body.type === "answer") {
            if(req.body.content) {
                Answer.updateOne({_id: req.params.id}, {
                    $set: {
                        content: req.body.content,
                        updated_at: new Date(),
                    }
                })
                .then(question => {
                    res.status(200).json(question)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            } else if(req.body.vote) {
                Answer.updateOne({_id: req.params.id}, {
                    $inc: { quantity: req.body.vote },
                    $set: { updated_at: new Date() },
                })
                .then(question => {
                    res.status(200).json(question)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            }
        }
    }
}

module.exports = Controller