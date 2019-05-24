const AnswerModel = require('../models/answer')

class Answer {
    static createAnswer(req, res, next){
        const { description, question_id } = req.body
        const user_id = req.decoded.id
        const upvotes = []
        const downvotes = [] 

        AnswerModel.create({ description, user_id, question_id, upvotes, downvotes})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            next( err )
        })
    }

    static getOneAnswer(req, res, next){
        const _id = req.params.id

        AnswerModel.findOne({_id})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }

    static deleteAnswer(req, res, next){
        const id = req.params.id

        AnswerModel.findOneAndDelete({_id:id})
        .then(( data ) => {
            res.status(200).json( data )
        })
        .catch(err => {
            next( err )
        })
    }

    static updateAnswer(req, res, next){
        const _id = req.params.id
        const {description } = req.body
        const obj = { description }

        Object.keys(obj).map( el => {
            if(!obj[el]){
                delete obj[el]
            }
        })

        AnswerModel.findOneAndUpdate({ _id }, obj, { new : true })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next( err )
        })
    }

    static patchUpvote(req, res, next){
        const _id = req.params.id
        const user_id = req.decoded.id

        Promise.all([
            AnswerModel.findOneAndUpdate({ _id }, {$addToSet : { upvotes: user_id }}),
            AnswerModel.findOneAndUpdate({ _id }, {$pull : { downvotes: user_id }})
        ])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static patchDownvote(req, res){
        const _id = req.params.id
        const user_id = req.decoded.id

        Promise.all([
            AnswerModel.findOneAndUpdate({ _id }, {$addToSet : { downvotes: user_id }}),
            AnswerModel.findOneAndUpdate({ _id }, {$pull : { upvotes: user_id }})
        ])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

}

module.exports = Answer