const Question = require("../models/questionmodel.js")
const Answer = require("../models/answermodel.js")
// const User = require("../models/usermodel.js")

class Controller {
    static getQuestions (req, res) {
        Question.find()
        .populate({
            path: 'author',
        })
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
        Answer.find({question_id: req.params.id})
        .populate({
            path: 'author',
        })
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
                author: req.userData.id,
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
                author: req.userData.id,
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
    
    static delete (req, res) { // Only questions can be deleted
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
    }

    static update(req, res) { // To update question title/content/vote(+1, 0, -1), or answer question title/content/vote(+1, 0, -1)
        if(req.body.type === "question") {
            console.log("updating question")
            let input = {}
            input.updated_at = new Date()
            if(req.body.title) input.title = req.body.title
            if(req.body.content) input.content = req.body.content

            Question.updateOne({_id: req.params.id}, {$set: input})
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json({err})
            })
        } else if(req.body.type === "answer") {
            console.log("updating answer")
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
        }
    }

    static vote(req, res) {
        if(req.body.type === "question") {
            if(req.body.vote === 1 || req.body.vote === '1') {
                console.log("question up")
                let flag = false
                Question.findOne({_id: req.params.id})
                .then(question => {
                    for(let userId of question.upvotes) {
                        if(userId === req.userData.id ) flag = true;
                    }
                    if(!flag) {
                        Question.updateOne({_id: req.params.id}, {
                            $push: {upvotes: req.userData.id},
                            $pull: {downvotes: req.userData.id},
                        })
                        .then(upvoted => {
                            return res.status(200).json(upvoted)
                        })
                        .catch(err => {
                            return res.status(500).json({err})
                        })
                    }
                    else {
                        res.status(403).json({message: "already upvoted"})
                    }
                })
                .catch(err => {
                    return res.status(500).json({err})
                })
                
            } else if(req.body.vote === 0 || req.body.vote === '0') {
                console.log("question neutral")
                Question.updateOne({_id: req.params.id}, {
                    $pull: {
                        upvotes: req.userData.id,
                        downvotes: req.userData.id
                    },
                })
                .then(zeroed => {
                    res.status(200).json(zeroed)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            } else if(req.body.vote === -1 || req.body.vote === '-1') {
                console.log("question down")
                let flag = false
                Question.findOne({_id: req.params.id})
                .then(question => {
                    for(let userId of question.downvotes) {
                        if(userId === req.userData.id ) flag = true;
                    }
                    if(!flag) {
                        Question.updateOne({_id: req.params.id}, {
                            $push: {downvotes: req.userData.id},
                            $pull: {upvotes: req.userData.id},
                        })
                        .then(downvoted => {
                            return res.status(200).json(downvoted)
                        })
                        .catch(err => {
                            return res.status(500).json({err})
                        })
                    }
                    else {
                        res.status(403).json({message: "already downvoted"})
                    }
                })
                .catch(err => {
                    return res.status(500).json({err})
                })
            }
        } else if (req.body.type === "answer") {
            if(req.body.vote === 1 || req.body.vote === '1') {
                console.log("answer up")
                let flag = false
                Answer.findOne({_id: req.params.id})
                .then(answer => {
                    for(let userId of answer.upvotes) {
                        if(userId === req.userData.id ) flag = true;
                    }
                    if(!flag) {
                        Answer.updateOne({_id: req.params.id}, {
                            $push: {upvotes: req.userData.id},
                            $pull: {downvotes: req.userData.id},
                        })
                        .then(upvoted => {
                            return res.status(200).json(upvoted)
                        })
                        .catch(err => {
                            return res.status(500).json({err})
                        })
                    }
                    else {
                        res.status(403).json({message: "already upvoted"})
                    }
                })
                .catch(err => {
                    return res.status(500).json({err})
                })
                
            } else if(req.body.vote === 0 || req.body.vote === '0') {
                console.log("answer neutral")
                Answer.updateOne({_id: req.params.id}, {
                    $pull: {
                        upvotes: req.userData.id,
                        downvotes: req.userData.id
                    },
                })
                .then(zeroed => {
                    res.status(200).json(zeroed)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            } else if(req.body.vote === -1 || req.body.vote === '-1') {
                console.log("answer down")
                let flag = false
                Answer.findOne({_id: req.params.id})
                .then(answer => {
                    for(let userId of answer.downvotes) {
                        if(userId === req.userData.id ) flag = true;
                    }
                    if(!flag) {
                        Answer.updateOne({_id: req.params.id}, {
                            $push: {downvotes: req.userData.id},
                            $pull: {upvotes: req.userData.id},
                        })
                        .then(downvoted => {
                            return res.status(200).json(downvoted)
                        })
                        .catch(err => {
                            return res.status(500).json({err})
                        })
                    }
                    else {
                        res.status(403).json({message: "already downvoted"})
                    }
                })
                .catch(err => {
                    return res.status(500).json({err})
                })
            }
        }
    }
}

module.exports = Controller