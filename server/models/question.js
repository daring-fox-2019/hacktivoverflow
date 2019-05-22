const mongoose = require('mongoose')
const {Schema} = mongoose
const questionSchema = new Schema({
    title: String,
    description: String,
    upVote: Number,
    downVote: Number,
    createdAt: Date,
    updatedAt: Date,
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question