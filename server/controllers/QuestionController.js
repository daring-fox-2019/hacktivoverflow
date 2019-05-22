const Question = require('../models/question')
const kue = require('kue')
const queue = kue.createQueue()

class QuestionController {
    static findAll(req, res) {
        Question.find()
        .populate('userId', 'username')
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static findBelongs(req, res) {
        Question.find({userId:req.headers.id})
        .populate('userId', 'username')
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static findOne(req, res) {
        Question.findById(req.params.id)
        .populate('userId', 'username')
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static create(req, res) {
        const { title, description, tags } = req.body

        let userId = req.headers.id

        Question.create({
            title,
            description,
            tags,
            userId
        })
        .then(question => {
            
        queue
        .create("queue example", {
        title: "This testing request",
        data: i
        })
        .priority("high")
        .save();
    
        res.status(200).json(question)
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static update(req,res) {
        const { title, description, tags } = req.body
        
        Question.findOneAndUpdate({_id: req.params.id}, {
            title,
            description,
            tags
        }, {new:true})
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Question.findByIdAndDelete(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }

    static updateVote(req,res){
        let voteType = req.params.voteType;
        let questionId = req.params.questionId;
        let userId = req.headers.id

        Question.findOne({_id:questionId})
        .populate('userId', 'username')
        .then((question)=>{
            if(voteType === "upvote"){
                if(question.upvote.includes(userId)){
                    question.upvote.pull(userId)
                }else if(question.downvote.includes(userId)){
                    question.downvote.pull(userId)
                    question.upvote.push(userId)
                }else{
                    question.upvote.push(userId)    
                }
            }else if(voteType === "downvote"){
                if(question.downvote.includes(userId)){
                    question.downvote.pull(userId)
                }else if(question.upvote.includes(userId)){
                    question.upvote.pull(userId)
                    question.downvote.push(userId)
                }else{
                    question.downvote.push(userId)
                }
            }else{
                throw new Error ("Invalid voteType")
            }
            return question.save()
        })
        .then((question)=>{
            res.status(200).json(question)
        })
        .catch(err=>{
            res.status(400).json({message: err})
        })
    }
}

module.exports = QuestionController
