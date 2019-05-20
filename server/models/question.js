const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const questionSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: [true, 'Please specify question']
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Question must have author']
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    answers: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Answer' 
        }
    ],
    tags: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Tag' 
        }
    ]

})


const Question  = mongoose.model('Question', questionSchema)

module.exports = Question