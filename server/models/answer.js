const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Question = require('./question')

let answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{timestamps: true})

// answerSchema.pre('findOneAndRemove', function(next) {
//   Question.findOne
// })

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer