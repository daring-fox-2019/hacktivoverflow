const Answer = require("../models/answer");
const Question = require("../models/question")

class AnswerController{

    static findAll(req,res,next){
        Answer.find().populate("userId")
        .then(results=>{
            res.status(200).json(results)      
        })
        .catch(err=>{
            next(err)
        })
    }

    static findBelongs(req,res,next){
        Answer.find({questionId: req.params.questionId})
        .populate("userId")
        .then(results=>{
            res.status(200).json(results)      
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static findOne(req,res,next){   
        Answer.findOne({_id:req.params.answerId})
        .then(result=>{
            if(result){
                res.status(200).json(result)
            }else{
                throw new Error("Item not found")
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static create(req,res,next){
        const {description} = req.body
        let questionId = req.params.questionId
        let userId = req.headers.id
        let answerDesc = ''
        
        Answer.create({
            description,
            upvote: [],
            downvote: [],
            userId,
            questionId
        })
        .then(result=>{
            answerDesc = result
            return Question.findByIdAndUpdate(
                questionId,
                {$push: {answers: result._id}},
                {new:true}
            )
        })
        .then(result=>{
            return Question.findOne(result._id).populate({path : 'answers', populate : {path : 'userId'}}).populate("userId")  
        })
        .then(result=>{
            res.status(201).json(answerDesc)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static update(req,res, next){
        let objUpdate = {}
        for(let key in req.body) {
            objUpdate[key] = req.body[key]
        }

        let updateVal = {}
        let id = req.params.id;
        req.body.description && (updateVal.description = req.body.description);

        Answer.findByIdAndUpdate(id, {description: objUpdate.description}, {new:true})
        .populate('userId')
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static updateVote(req,res){
        let voteType = req.params.voteType;
        let answerId = req.params.answerId;
        let userId = req.headers.id

        Answer.findOne({_id:answerId})
        .populate('userId', 'username')
        .then((answer)=>{
            if(voteType === "upvote"){
                if(answer.upvote.includes(userId)){
                    answer.upvote.pull(userId)
                }else if(answer.downvote.includes(userId)){
                    answer.downvote.pull(userId)
                    answer.upvote.push(userId)
                }else{
                    answer.upvote.push(userId)
                }
            }else if(voteType === "downvote"){
                if(answer.downvote.includes(userId)){
                    answer.downvote.pull(userId)
                }else if(answer.upvote.includes(userId)){
                    answer.upvote.pull(userId)
                    answer.downvote.push(userId)
                }else{
                    answer.downvote.push(userId)
                }
            }else{
                throw new Error ("Invalid voteType")
            }
            return answer.save()
        })
        .then((answer)=>{
            res.status(200).json(answer)
        })
        .catch(err=>{
            res.status(400).json({message: err})
        })
    }

    static delete(req, res) {
        Answer
        .findByIdAndDelete(req)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(400).json({message: err})
        })
    }
}

module.exports = AnswerController;