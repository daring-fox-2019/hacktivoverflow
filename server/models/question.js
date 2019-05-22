const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answers'
  }],
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{timestamps: true})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question