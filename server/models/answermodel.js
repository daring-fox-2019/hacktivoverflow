const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model('Answer', answerSchema); // the model