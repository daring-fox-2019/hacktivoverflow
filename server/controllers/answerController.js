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

    static getOne(req,res){
        console.log('masuk get one========');
        
        Answer
        .findById(req.params.answerid)
        .then(answer =>{
            console.log('ini answer========',answer);
            
            res.status(200).json(answer)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
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
        console.log('masuk ke conts delete answer');
        
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
            return Question.findOneAndUpdate({_id: questionId},{$pull : {answerList : answerId}},{new : true})
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
        console.log('masuk answer update====');
        console.log('req bodyyyy',req.body,req.params.answerid);
        
        Answer
        .findByIdAndUpdate(req.params.answerid,req.body,{new : true})
        .then(answer =>{
            console.log('ini answerrrrrr',answer);
            
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

    static upvote(req,res){
        Answer.findOne({_id : req.params.answerid})
        .then(answer =>{
            console.log('hasil find one and update',answer);
            
            let checkInUpvote = answer.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = answer.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote !== -1){
                console.log(`status downvoted`);
                answer.downVotes.splice(checkInDownvote,1)
                console.log(`status == neutral`);
                console.log(answer);
                return answer.save()
            }else{
                if(checkInUpvote === -1){
                    console.log(`status == not yet voted`);
                    answer.upVotes.push(req.loggedUser.id)
                    console.log(`you're upvoting`);
                    return answer.save()
                }
                console.log(`status upvoted`);
                return question
            }
        })
        .then(answer =>{
            res.status(200).json(answer)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`,
                err
            })
        })
    }

    static downvote(req,res){
        Answer.findOne({_id : req.params.answerid})
        .then(answer =>{
            console.log('hasil find one and update',answer);
            let checkInUpvote = answer.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = answer.downVotes.indexOf(req.loggedUser.id)
            if(checkInUpvote !== -1){
                console.log(`status upvoted`);
                console.log('ini answer upvote before slice',checkInUpvote,answer.upVotes);
                answer.upVotes.splice(checkInUpvote,1)
                console.log('ini answer upvote after slice',checkInUpvote,answer.upVotes);  
                console.log(`status == neutral`);
                return answer.save()
                
            }else{
                if(checkInDownvote === -1){
                    console.log(`status == not yet voted`);
                    answer.downVotes.push(req.loggedUser.id)
                    console.log(`you're downvoting`);
                    return answer.save()
                }
                console.log(`status upvoted`);
                return answer
            }
        })
        .then(answer =>{
            res.status(200).json(answer)
        })
        .catch(err=>{
            console.log(err);
            
            res.status(500).json({
                msg : `internal server error`,
                err
            })
        })
    }

    
}

module.exports = AnswerController