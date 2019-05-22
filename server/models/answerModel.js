const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required']        
    },
    upvotes: Number,
    downvotes: Number,
    questionId: {
        type: ObjectId,
        ref: 'Question',
    },
    author: {
        type: ObjectId,
        ref: 'User',
    },
    createdAt: Date,
    updatedAt: Date,
})

answerSchema.pre('save', function(next){
    this.upvotes = 0
    this.downvotes = 0
    this.createdAt = new Date()
    this.updatedAt = new Date()
    next()
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer