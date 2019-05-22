const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    answer: {
        type: String,
        required: [true, 'Answer is required!']
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    QuestionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer