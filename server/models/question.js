const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
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
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question