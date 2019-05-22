const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let questionSchema = new Schema({
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    votes: [{ voteUserId: { type: Schema.Types.ObjectId, ref: "User" }, status: Boolean, at:Date}],
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
let Question = mongoose.model('Question', questionSchema)
module.exports = Question

