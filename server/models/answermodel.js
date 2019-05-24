const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: {
    type: Array,
    default: [],
  },
  downvotes: {
    type: Array,
    default: [],
  },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model('Answer', answerSchema); // the model