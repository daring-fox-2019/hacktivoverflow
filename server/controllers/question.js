const Question = require('../models/question.js')
require('./user.js');
class QuestionController {
    static create(req,res) {
        const { question, description, tags } = req.body
        const user = req.decoded._id
        const question_obj = { question, description, user, tags }

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
        .populate({path: 'user'})
        .then(found => {
            res.status(200).json(found)
            //increase view
            Question.findOneAndUpdate({_id:found._id}, {$inc: {views: 1}})
            .then(updated => {
                console.log('success update view')
            }) 
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message,
                error: 'Error while findOne - question'
            })
        })
    }

    static findAll(req,res) {
        let query = {}
        let sort = {}
        let skip_data
        console.log(req.query, 'query------')
        let { question, tags, description } = req.query
        
        

        if( question || tags || description ) {
            query = {$or:[]}
            // description = new RegExp(description)
            // query = { $or: [
            //     {question: { $regex: question, $options: 'i' }},
            //     {'tags.text': { $regex: tags, $options: 'i' }},
            //     {description: { $regex: description, $options: 'i' }}
            // ]}
        }

        if(question) {
            question = new RegExp(question)
            query.$or.push({question: { $regex: question, $options: 'i' }})
        }
        if(tags) {
            tags = new RegExp(tags)
            query.$or.push({'tags.text': { $regex: tags, $options: 'i' }})
        }
        if(description) {
            description = new RegExp(description)
            query.$or.push({description: { $regex: description, $options: 'i' }})
        }


        console.log(query, '-----query findall')
        //insert query later

        Question.find(query)
        .populate('user')
        .then(found => {
            console.log(found)
            res.status(200).json(found)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message:err.message,
                error: 'Error while findAll - question'
            })
        })
    }

    static updateOne(req,res) {
        const { question, description, tags } = req.body
        const _id = req.params.id

        const update_obj = { question, description, tags }
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
        const upvote_obj = {$push: {upvotes: req.decoded._id}, $pull: {downvotes: req.decoded._id}}
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