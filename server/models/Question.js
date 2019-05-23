const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answer'
  }],
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Question = mongoose.model('question', questionSchema)

module.exports = Question
