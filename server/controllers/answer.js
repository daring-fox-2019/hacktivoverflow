const Answer = require('../models/answer')
class AnswerController {
    static create(req,res) {
        const user = req.decoded._id
        const { question, answer, description } = req.body
        let answer_obj = { question, answer, description, user }

        Answer.create(answer_obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            let message;
            if(err.errors.question) {
                message = err.errors.question.message
            } else {
                message =err.message
            }
            
            res.status(500).json({
                message,
                error:'Error while creating new answer',
            })
        })
    }
    
    static findOne(req,res) {
        const _id = req.params.id

        Answer.findOne({_id})
        .populate('user')
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while findOne answer'
            })
        })
    }
    
    static findAll(req,res) {
        let query = {};

        //add query later

        Answer.find(query)
        .populate('user')
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while find article'
            })
        })
    }

    static findAnswerByQuestionId(req,res) {
        console.log(req.params)
        Answer.find({question: req.params.question_id})
        .populate('user')
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error finding answer based on question\'s id',
            })
        })
    }
    
    static updateOne(req,res) {
        const _id = req.params.id
        const { answer } = req.body

        let update_obj = { answer }
        Object.keys(update_obj).forEach((key) => (update_obj[key] == null) && delete update_obj[key]);
        

        Answer.findOneAndUpdate({_id}, update_obj, {new:true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while updating answer'
            })
        })
    }
    
    static deleteOne(req,res) {
        const _id = req.params.id

        Answer.findOneAndDelete({_id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Error while deleting answer',
                message: err.message,
            })
        })
    }

    static upvote(req,res) {
        const answer_id = req.params.id
        const upvote_obj = {$push: {upvotes: req.decoded._id}, $pull: {downvotes: req.decoded._id}}
        Answer.findOneAndUpdate({_id:answer_id}, upvote_obj, {new:true})
        .then(upvoted => {
            if(upvoted) {
                res.status(200).json(upvoted)
            } else {
                res.status(500).json({message: 'Answer not found'})
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while upvoting'
            })
        })
    }

    static downvote(req,res) {
        const answer_id = req.params.id
        const downvote_obj = {$pull: {upvotes: req.decoded._id}, $push: {downvotes: req.decoded._id}}

        Answer.findOneAndUpdate({_id:answer_id}, downvote_obj, {new:true})
        .then(downvoted => {
            if(downvoted) {
                res.status(200).json(downvoted)
            } else {
                res.status(500).json({message: 'Answer not found'})
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while downvoting'
            })
        })
    }
    
}
module.exports = AnswerController