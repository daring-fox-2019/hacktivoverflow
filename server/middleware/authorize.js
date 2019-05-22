const Question = require('../models/Question.js')
const Answer = require('../models/Answer.js')

module.exports = (req, res, next) => {
    if (req.params.answerId) {
        console.log('=====  ANSWER =====');
        Answer.findById(req.params.answerId)
            .populate('author')
            .then(found => {
                if (found) {
                    console.log('check if answer owner')
                    if (found.author.id === req.loggedUser.id) {
                        console.log('is owner');
                        next()
                    } else {
                        console.log('not owner');
                        res.status(401).json({
                            msg: "not authorized"
                        })
                    }
                } else {
                    console.log('anwer not found');
                    res.status(404).json({
                        msg: "answer not found"
                    })
                }
            }).catch(error => {
                console.log('server error');
                res.status(500).json(error.errors)
            })
    } else if (req.params.questionId) {
        console.log('=====  QUESTION =====');
        Question.findById(req.params.questionId)
            .populate('author')
            .then(found => {
                if (found) {
                    console.log('check if question owner');
                    if (found.author.id == req.loggedUser.id) {
                        console.log('is owner');
                        next()
                    } else {
                        console.log('not owner');
                        res.status(401).json({
                            msg: "not authorized"
                        })
                    }
                } else {
                    console.log('question not found');
                    res.status(404).json({
                        msg: "question not found"
                    })
                }
            }).catch(error => {
                console.log('server error');
                res.status(500).json(error.errors)
            })
    }
}