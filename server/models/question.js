const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  title: String,
  description: String,
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question 