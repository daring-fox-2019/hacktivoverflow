const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let commentSchema = new Schema({
    by:{ type: Schema.Types.ObjectId, ref: 'User' },    
    content: { type: String, required: true },
    votes: [{ voteUserId: { type: Schema.Types.ObjectId, ref: "User" }, status: Boolean, at:Date}],
},{ timestamps: { createdAt: 'created_at',updatedAt: 'updated_at' }})

let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment

