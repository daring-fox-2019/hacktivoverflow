const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
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
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        default: []
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    watchTags: [{type: Array}],
    createdAt: String,
    updatedAt: String,
    views: Number
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question