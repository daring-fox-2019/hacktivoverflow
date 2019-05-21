const Question = require('../models/question.js')
class QuestionController {
    static create(req,res) {
        const { question, description } = req.body
        const user = req.decoded._id
        const question_obj = { question, description, user }

        Question.create(question_obj)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Error while saving new answer',
                message: err.message,
            })
        })
    }

    static findOne(req,res) {
        Question.findOne({_id:req.params.id})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while findOne - article'
            })
        })
    }

    static findAll(req,res) {
        let query = {}

        //insert query later

        Question.find(query)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:err.message,
                error: 'Error while findAll - question'
            })
        })
    }

    static updateOne(req,res) {
        const { question, description } = req.body
        const _id = req.params.id

        const update_obj = { question, description}
        Object.keys(update_obj).forEach((key) => (update_obj[key] == null) && delete update_obj[key]);

        Question.findOneAndUpdate({_id}, update_obj, {new:true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Error while updating question data',
                message: err.message
            })
        })
    }

    static deleteOne(req,res) {
        const _id = req.params.id
        Question.findOneAndDelete({_id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while deleting question'
            })
        })
    }

    static upvote(req,res) {
        const question_id = req.params.id
        const upvote_obj = {$push: {upvotes: req.decoded._id}, $pull: {downvotes: req.decoded._od}}
        Question.findOneAndUpdate({_id:question_id}, upvote_obj, {new:true})
        .then(upvoted => {
            res.status(200).json(upvoted)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while upvoting'
            })
        })
    }

    static downvote(req,res) {
        const question_id = req.params.id
        const downvote_obj = {$pull: {upvotes: req.decoded._id}, $push: {downvotes: req.decoded._id}}

        Question.findOneAndUpdate({_id:question_id}, downvote_obj, {new:true})
        .then(downvoted => {
            res.status(200).json(downvoted)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while upvoting'
            })
        })
    }

}
module.exports = QuestionController