const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: String,
    updatedAt: String,
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer 