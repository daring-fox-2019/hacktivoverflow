const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
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

module.exports = mongoose.model('Question', questionSchema); // the model