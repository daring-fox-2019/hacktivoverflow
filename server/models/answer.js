const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Please specify question']
    },
    created_at: {
        type: Date,
        default: new Date
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Answer must have author']
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'Answer must have a question first']
    }

})

const Answer  = mongoose.model('Answer', answerSchema)

module.exports = Answer