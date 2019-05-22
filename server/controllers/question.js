const { Question } = require('../models')

class ControllerQuestion {
    static create (req,res) {
        console.log('controller')
        let { title,description } = req.body
        let { _id, username } = req.user
        Question.create({ title, description, userId : _id, username })
        .then(data =>{
            res.status(201).json( data )
        })
        .catch(err =>{
            res.status(500).json({ message : 'Internal server error'})
        })
    }
    static findAll (req,res) {
        Question.find()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({ message : 'Internal server error'})
        })
    } 
    static findOne (req,res) {
        let { id } = req.params
        Question.findOne ({ _id : id })
        .then(data =>{
            res.status(200).json( data )
        })
        .catch(err =>{
            res.status(500).json({ message : 'Internal server error'})            
        })
    }
    static update (req,res) {
        let { description,title } = req.body
        let { id } = req.params
        let newQuestion = { description,title }
        Question.findOneAndUpdate({ _id: id },newQuestion, { new: true })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json ({ message : "Internal server error"})
        })
    }
    static upVote (req,res) {
        let questionId = req.params.id
        let voter = req.user._id
        Question.findOne({_id : questionId})
        .then(data =>{
            if(data.upVotes.includes(voter)){
                return Question.findOneAndUpdate({_id: questionId}, {$pull: {upVotes: voter}}, {new : true})
            }else if (data.downVotes.includes(voter)){
                return Question.findOneAndUpdate({_id: questionId}, {$pull: {downVotes: voter}}, {new : true})
                .then(data =>{
                    return Question.findOneAndUpdate({_id: questionId}, {$push: {upVotes: voter}}, {new : true})
                })               
            }
            else {
                return Question.findOneAndUpdate({_id: questionId}, {$push: {upVotes: voter}}, {new : true})
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
        let questionId = req.params.id
        let voter = req.user._id
        Question.findOne({_id : questionId})
        .then(data =>{
            if(data.downVotes.includes(voter)){
                return Question.findOneAndUpdate({_id : questionId},{$pull: {downVotes: voter}}, {new : true})
            }else if (data.upVotes.includes(voter)){
                return Question.findOneAndUpdate({_id : questionId},{$pull: {upVotes: voter}}, {new : true}) 
                .then(data =>{
                    return Question.findOneAndUpdate({_id : questionId},{$push: {downVotes: voter}}, {new : true}) 
                })
            }else {
                return Question.findOneAndUpdate({_id : questionId},{$push: {downVotes: voter}}, {new : true})                 
            }
            
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err => { 
            res.status(500).json('Internal server error')
        })
    }
    static delete (req,res) {
        let { id } = req.params
        Question.deleteOne({ _id: id})
        .then(data =>{
            res.status(200).json({ message : 'Delete succesfully'})
        })
        .catch(err =>{
            res.status(500).json({ message : "Internal server error" })
        })
    }
}
module.exports = ControllerQuestion