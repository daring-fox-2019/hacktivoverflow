const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  description : {
      type : String,
      required : [true,'Description required']
  },
  upVotes : [{
      type : String,
  }],
  downVotes : [{
      type : String,
  }],
  userId : {
    type : String
  }, 
  username : {
    type : String
  }
  
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question