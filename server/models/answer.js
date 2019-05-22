const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  description: String,
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer 