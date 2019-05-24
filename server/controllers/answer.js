const Answer = require('../models/answer')
const Question = require('../models/question')
class AnswerController {
    static create(req, res){
        const {description ,idQuestion} = req.body
        console.log('sampai ------------')
        Answer.create({
            description,
            upVote: [],
            downVote: [],
            idUser : req.payload.id,
            idQuestion,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static read(req,res){
        Answer.find()
        .populate('idUser')
        .populate('idQuestion')
        .then(function (data) {
            if(data.length === 0){
                res.status(404).json({
                    msg: 'data not found'
                })
            }else {
                res.status(200).json(data)
            }
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })
    }

    static readOne(req, res){
        let dataId = req.params.id
        Answer.findOne({
            _id: dataId
        })
        .populate('idUser')
        .populate('idQuestion')
        .then(function (data) {
            if(!data){
                res.status(401).json({
                    msg: 'data not found'
                })
            }else {
                res.status(200).json(data)
            }
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })
    }

    static update(req, res){
        let AnswerId = req.params.id
        const { description, upVote, downVote} = req.body
       let obj = {
        updatedAt: new Date(),
        upVote,
        downVote,
        description
       }
       for (const key in obj) {
           if(obj[key] === undefined){
               delete obj[key]

           }
       }
        Answer.findOneAndUpdate({_id: AnswerId}, obj,{new: true})
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

}

module.exports = AnswerController