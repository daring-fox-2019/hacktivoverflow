const { Answer } = require('../models')

class ControllerAnswer {
    static create (req,res) {
        let {  description, questionId } = req.body
        let {_id, username} = req.user
        Answer.create({  description, questionId, userId: _id, username })
        .then(data => {
            res.status(201).json({data})
        })
        .catch(err =>{
            res.status(400).json({ message : err.message})
        })
    }
    static findOne (req,res) {
        let{ id }= req.params
        Answer.findOne({_id : id})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json("Internal server error")
        })
    }
    static findAll (req,res){
        let questionId = req.params.questionId
        Answer.find({questionId })
        .then(data =>{
            res.status(200).json({data})
        })
        .catch(err => {
            res.status(400).status({ message : err.message})
        })
    }
    static update (req,res) {
        let {  description } = req.body
        let { id }= req.params
        let newAnswer = { description }
        Answer.findOneAndUpdate({_id : id}, newAnswer , { new : true })
        .then(data =>{
            res.status(200).json({ data })
        })
        .catch(err =>{
            res.status(400).json({ message : err.message })
        })
    }
    static upVote (req,res) {
        let answerId = req.params.id
        let voter = req.user._id
        Answer.findOne({ _id: answerId})
        .then(data =>{
            if(data.upVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {upVotes: voter}}, {new : true})
            }else if (data.downVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {downVotes: voter}}, {new : true})
                .then(data =>{
                    return Answer.findOneAndUpdate({_id: answerId}, {$push: {upVotes: voter}}, {new : true})
                })               
            }
            else {
                return Answer.findOneAndUpdate({_id: answerId}, {$push: {upVotes: voter}}, {new : true})
            }
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err => { 
            res.status(500).json('Internal server error')
        })
    }
    static downVote (req,res) {
        let answerId = req.params.id
        let voter = req.user._id
        Answer.findOne({ _id: answerId})
        .then(data =>{
            if(data.downVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {downVotes: voter}}, {new : true})
            }else if (data.upVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {upVotes: voter}}, {new : true})
                .then(data =>{
                    return Answer.findOneAndUpdate({_id: answerId}, {$push: {downVotes: voter}}, {new : true})
                })               
            }
            else {
                return Answer.findOneAndUpdate({_id: answerId}, {$push: {downVotes: voter}}, {new : true})
            }
        })
        .then(data =>{
                res.status(201).json(data)
        })
        .catch(err => { 
            res.status(500).json('Internal server error')
        })
    }
    static deleteMany (req,res) {
        let questionId  = req.params.id
        Answer.deleteMany({ questionId })
        .then(data =>{
            res.status(200).json({ message : 'Delete answers successfully'})
        })
        .catch(err =>{
            res.status(500).json({ message: "internal server error" })
        })
    } 
}
module.exports = ControllerAnswer