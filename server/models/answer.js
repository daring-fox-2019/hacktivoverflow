const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const questionModel = require('../models/question')

const AnswerSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    upvotes: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    downvotes: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    question_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Question',
        required: true
    }
}, { timestamps: true })


AnswerSchema.post('save', function(doc, next){
    questionModel.findOneAndUpdate({ _id: doc.question_id }, { $push: { answers: doc._id }})
    .then(data => {
        next()
    })
    .catch( err => {
        next(err)
    })
})

AnswerSchema.post('findOneAndDelete', function(doc, next){
    questionModel.findOneAndUpdate({ _id: doc.question_id }, { $pull: { answers: doc._id }})
    .then(data => {
        next()
    })
    .catch( err => {
        next(err)
    })
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer