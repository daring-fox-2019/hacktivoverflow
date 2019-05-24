const jwt = require('jsonwebtoken')
const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
    authenticate(req, res, next){
        if( req.headers.token ){
            try{
                let decoded = jwt.verify( req.headers.token, process.env.JWT_KEY )
                console.log(decoded)
                req.decoded = decoded
                next()
            } catch( err ){
                next(err)
            }
        } else {
            next({ message : `Unauthenticate` })
        }
    },
    authorAnswer(req, res, next){
        const user_id = req.decoded.id

        Answer.findOne({ _id: req.params.id })
        .then( data => {
            if(data.user_id == user_id){
                next()
            } else {
                next({ message : 'Unauthorize'})
            }
        })
        .catch( err => {
            next( err )  
        })
    },
    authorQuestion(req, res, next){
        const user_id = req.decoded.id

        Question.findOne({ _id: req.params.id })
        .then( data => {
            if(data.user_id == user_id){
                next()
            } else {
                next({ message : 'Unauthorize'})
            }
        })
        .catch( err => {
            next( err )  
        })
    }
}