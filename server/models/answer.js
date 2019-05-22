const mongoose = require('mongoose')

let answerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, `Description required.`],
  },
  questionId : {
    type : String,
    required: [true, `Id Question required.`],
  },
  upVotes : [{
      type : String
  }],
  downVotes : [{
      type : String
  }],
  userId : {
    type : String
  },
  username : {
    type : String
  }
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer