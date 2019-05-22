const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let answerSchema = new Schema({
    by:{ type: Schema.Types.ObjectId, ref: 'User' },    
    content: { type: String, required: true },
    votes: [{ voteUserId: { type: Schema.Types.ObjectId, ref: "User" }, status: Boolean, at:Date}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer

