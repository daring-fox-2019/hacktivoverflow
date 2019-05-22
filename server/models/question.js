const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Answer = require('./answer')

const QuestionSchema = new Schema({
    title : {
        type: String,
        required: true
    },
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
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    tags: Array
}, { timestamps: true })


const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question