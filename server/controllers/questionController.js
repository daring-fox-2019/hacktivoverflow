const Question = require('../models/question')
const User = require('../models/user')
class QuestionController{
    
    static getAll(req,res){
        Question
        .find({})
        .populate('answerList')
        .then(questions =>{
            res.status(201).json(questions)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static create(req,res){
        req.body.userId = req.loggedUser.id
        const newQuestion = new Question(req.body)
        newQuestion.save()
        .then(question =>{
            return User.findByIdAndUpdate({_id : req.loggedUser.id},{$push : {questionList : question._id}},{new : true})
            // res.status(200).json(question)
        })
        .then(user => {
            console.log('updated user',user);
            res.status(201).json(newQuestion)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static getUserQuestion(req,res){
        let userId = req.params.userid
        Question
        .find({userId : userId})
        .then(questions => {
            res.status(201).json(questions)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static update(req,res){
        Question
        .findByIdAndUpdate(req.params.questionid,req.body,{new : true})
        .then(question =>{
            res.status(201).json(question)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg: `internal server error`
            })
        })
    }

    static upvote(req,res){
        Question.findOne({_id : req.params.questionid})
        .then(question =>{
            console.log('hasil find one and update',question);
            
            let checkInUpvote = question.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = question.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote !== -1){
                console.log(`status downvoted`);
                question.downVotes.splice(checkInDownvote,1)
                console.log(`status == neutral`);
                console.log(question);
                return question.save()
            }else{
                if(checkInUpvote === -1){
                    console.log(`status == not yet voted`);
                    question.upVotes.push(req.loggedUser.id)
                    console.log(`you're upvoting`);
                    return question.save()
                }
                console.log(`status upvoted`);
                return question
            }
        })
        .then(question =>{
            res.status(200).json(question)
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
        Question.findOne({_id : req.params.questionid})
        .then(question =>{
            console.log('hasil find one and update',question);
            let checkInUpvote = question.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = question.downVotes.indexOf(req.loggedUser.id)
            if(checkInUpvote !== -1){
                console.log(`status upvoted`);
                console.log('ini question upvote before slice',checkInUpvote,question.upVotes);
                question.upVotes.splice(checkInUpvote,1)
                console.log('ini question upvote after slice',checkInUpvote,question.upVotes);  
                console.log(`status == neutral`);
                return question.save()
                
            }else{
                if(checkInDownvote === -1){
                    console.log(`status == not yet voted`);
                    question.downVotes.push(req.loggedUser.id)
                    console.log(`you're downvoting`);
                    return question.save()
                }
                console.log(`status upvoted`);
                return question
            }
        })
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(err=>{
            console.log(err);
            
            res.status(500).json({
                msg : `internal server error`,
                err
            })
        })
    }

    static delete(req,res){
        Question
        .findOneAndDelete({_id : req.params.questionid})
        .then(question =>{
            res.status(201).json(question)
        })
        .catch(err =>{
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }
}

module.exports = QuestionController