const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']        
    },
    description: {
        type: String,
        required: [true, 'Title is required']        
    },
    upvotes: Number,
    downvotes: Number,
    author: {
        type: ObjectId,
        ref: 'User',
    },
    createdAt: Date,
    updatedAt: Date,
})

questionSchema.pre('save', function(next){
    this.upvotes = 0
    this.downvotes = 0
    this.createdAt = new Date()
    this.updatedAt = new Date()
    next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question