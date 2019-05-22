const Question = require('../models/question')

class QuestionController {
    static create(req, res){
        const {title,description,idUser} = req.body
        Question.create({
            title,
            description,
            upVote: 0,
            downVote: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            idUser
    
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static read(req,res){
        Question.find(null, null, {sort: {_id:-1}})
        .populate({path:'idUser', select: 'name email'})
        .populate({ 
            path: 'answers',
            populate: {
              path: 'idUser',
              select: 'name',
              model: 'User'
            } 
         })
        .then(function (data) {
            res.status(200).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })
    }

    static readOne(req, res){
        let dataId = req.params.id
        Question.findOne({
            _id: dataId
        })
        .populate({path:'idUser', select: 'name email'})
        .populate({ 
            path: 'answers',
            populate: {
              path: 'idUser',
              select: 'name',
              model: 'User'
            } 
         })
        .then(function (data) {
            console.log(data)
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
        let questionId = req.params.id
        const { title,description, upVote, downVote} = req.body
       let obj = {
        updatedAt: new Date(),
        title,
        upVote,
        downVote,
        description
       }
       for (const key in obj) {
           if(obj[key] === undefined){
               delete obj[key]

           }
       }
        Product.findOneAndUpdate({_id: questionId}, obj
        )
        .then(function (data) {
            res.status(201).json({
                id: data.id,
                rowChange: obj
            })
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static delete(req, res){
        let userId = req.params.id
        Question.deleteOne({
            _id: userId
        })
        .then(function (data) {

            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
        })

    }
}

module.exports = QuestionController