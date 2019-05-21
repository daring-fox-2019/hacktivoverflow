const Question = require('../models/question')
const Answer = require('../models/answer')

class AnswerController {
    static findAll(req, res) {
        Answer.find()
        .populate('question')
        .populate({path: 'author', select: 'firstname lastname email'})
        .exec()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findOne(req, res) {
        Answer.find({_id: req.params.id})
            .populate('question')
            .populate({path: 'author', select: 'firstname lastname email'})
            .exec()
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static upvote(req, res) {
        Answer.findOne({_id: req.params.id})
            .then(found => {
                found.upvote = !found.upvote ? [] : found.upvote;
                found.downvote = !found.downvote ? [] : found.downvote;
                let exist = null
                exist = found.upvote.find( x => x.toString() == req.user._id.toString())

                if(!exist) {
                    found.upvote.push(req.user._id)
                    let post = found.downvote.indexOf(req.user._id)
                    if(post > -1) {
                        found.downvote.splice(post, 1)
                    }
                    found.save()
                    .then(updated => {
                        res.status(200).json(updated)
                    })
                }
                else {
                    res.status(400).json('You have upvoted for this answer')
                }
                
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static downvote(req, res) {
        Answer.findOne({_id: req.params.id})
            .then(found => {
                found.upvote = !found.upvote ? [] : found.upvote;
                found.downvote = !found.downvote ? [] : found.downvote;
                let exist = found.downvote.find( x => x.toString() == req.user._id.toString())

                if(!exist) {
                    found.downvote.push(req.user._id)
                    let post = found.upvote.indexOf(req.user._id.toString())
                    if(post > -1) {
                        found.upvote.splice(post, 1)
                    }

                    found.save()
                    .then(updated => {
                        console.log('downvoted...', updated);
                        res.status(200).json(updated)
                    })
                }
                else {
                    res.status(400).json('You have downvoted for this answer')
                }
                
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let newObj = {}
        let questionId = req.params.questionId

        for(let key of Object.keys(req.body)) {
            newObj[key] = req.body[key]
        }
        newObj.question = questionId
        newObj.author = req.user._id

        Answer.create(newObj)
        .then(created => {

            //link answers to the question's answer array
            Question
                .findOneAndUpdate({_id: questionId}, {$push: {answers: created}}, {new: true})
                .then(question => {
                    res.status(201).json(created)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Answer.findOneAndDelete({_id: req.params.id})
            .then(obj => {
                res.status(200).json(obj)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let updates = {}

        for(let key of Object.keys(req.body)) {
            updates[key] = req.body[key]
        }

        Answer.findOneAndUpdate({_id: req.params.id}, updates, {new: true})
            .then(obj => {
                res.status(200).json(obj)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = AnswerController