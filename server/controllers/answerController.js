const Answer = require('../models/answer')
const User = require('../models/user')
const Question = require('../models/question')

class AnswerController{

    static getAll(req,res){
        Answer
        .find({})
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`,
                err
            })
        })
    }

    static getUserAnswer(req,res){
        Answer
        .find({userId : req.params.userid})
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : 'internal server error',
                err
            })
        })
    }

    static getQuestionAnswer(req,res){
        Answer
        .find({questionId : req.params.questionid})
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : 'internal server error',
                err
            })
        })
    }
    
    static create(req,res){
        let questionId = req.params.questionid
        let userId = req.loggedUser.id
        req.body.userId = userId
        req.body.questionId = questionId
        console.log('req.body create answer',req.body);
        
            let newAnswer = new Answer(req.body)
            newAnswer.save()
            .then(answer =>{
                console.log('created answer ==>',answer);
                return User.findOneAndUpdate({_id : req.loggedUser.id}, { $push: { answerList: newAnswer._id }}, {new : true})
            })
            .then(user =>{
                console.log(`updated user ==>`,user);
                return Question.findOneAndUpdate({_id : questionId}, { $push: {answerList : newAnswer._id}},{new : true})
            })
            .then(question =>{
                console.log('updated question ==>',question);
                res.status(200).json(newAnswer)
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    msg: `internal server error`,
                    err
                })
            })
        }

    static delete(req,res){
        let questionId = req.params.questionid
        let answerId = req.params.answerid
        let deleted;
        Answer
        .findOneAndDelete({_id : answerId})
        .then(answer =>{
            deleted = answer
            return User.findOneAndUpdate({_id : req.loggedUser.id},{$pull : {answerList : answerId}},{new : true})
        })
        .then(user => {
            return Question.findByIdAndUpdate({_id: questionId},{$pull : {answerList : answerId}},{new : true})
        })
        .then(question =>{
            res.status(200).json(deleted)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`,
                err
            })
        })
    }

    static update(req,res){
        Answer
        .findByIdAndUpdate(req.params.answerid,req.body,{new : true})
        .then(answer =>{
            res.status(201).json(answer)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg: `internal server error`,
                err
            })
        })
    }
    
}

module.exports = AnswerController