const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  upvotes: [{type : Schema.Types.ObjectId, ref : "User"}],
  downvotes: [{type : Schema.Types.ObjectId, ref : "User"}],
  userId: {type : Schema.Types.ObjectId, ref : "User"},
  questionId: {type : Schema.Types.ObjectId, ref : "Question"}
},{
  timestamps: true
});

let Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
