const Question = require('../models/question')
const Answer = require('../models/answer')
const ObjectId = require('mongoose').Types.ObjectId
const Tag = require('../models/tag')

class QuestionController {
    static findAll(req, res) {
        Question.find()
        .populate({path: 'author', select: 'firstname lastname email'})
        .populate('tags')
        .exec()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findAllWithTags(req, res) {
        let tag;
        Tag.findOne({name: req.body.tag})
        .then(tag => {
            Question.find({tags: tag._id})
            .populate({path: 'author', select: 'firstname lastname email'})
            .exec()
            .then(list => {
                res.status(200).json(list)
            })

        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static findOne(req, res) {
        let questionDetail
        Question.findOne({_id: req.params.id})
            .populate({path: 'answers', populate: {path: 'author'}})
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
        Question.findOne({_id: req.params.id})
            .then(found => {
                found.upvote = !found.upvote ? [] : found.upvote;
                found.downvote = !found.downvote ? [] : found.downvote;
                let exist = found.upvote.find( x => x.toString() == req.user._id.toString())

                console.log('user exist? === ', exist);
                if(!exist) {
                    found.upvote.push(req.user._id)
                    let post = found.downvote.indexOf(req.user._id.toString())
                    if(post > -1) {
                        found.downvote.splice(post, 1)
                    }

                    found.save()
                    .then(updated => {
                        res.status(200).json(updated)
                    })
                }
                else {
                    res.status(400).json('You have upvoted for this question')
                }
                
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json(err)
            })
    }

    static downvote(req, res) {
        Question.findOne({_id: req.params.id})
            .then(found => {
                found.upvote = !found.upvote ? [] : found.upvote;
                found.downvote = !found.downvote ? [] : found.downvote;
                let exist = found.downvote.find( x => x.toString() == req.user._id.toString())

                console.log('user exist? === ', exist);
                if(!exist) {
                    found.downvote.push(req.user._id)
                    let post = found.upvote.indexOf(req.user._id.toString())
                    if(post > -1) {
                        found.upvote.splice(post, 1)
                    }

                    found.save()
                    .then(updated => {
                        console.log('downvoted...',updated);
                        res.status(200).json(updated)
                    })
                }
                else {
                    res.status(400).json('You have downvoted for this question')
                }
                
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let newObj = {}

        for(let key of Object.keys(req.body)) {
            newObj[key] = req.body[key]
        }

        newObj.author = req.user._id

        Question.create(newObj)
        .then(question => {
            console.log(`question created...`);
            res.status(201).json(question)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Question.findOneAndDelete({_id: req.params.id})
            .then(q => {
                res.status(200).json(q)
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
        console.log(updates);
        Question.findOneAndUpdate({_id: req.params.id}, updates, {new: true})
            .then(q => {
                res.status(200).json(q)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = QuestionController