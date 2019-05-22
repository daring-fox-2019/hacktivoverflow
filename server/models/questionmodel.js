const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
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

module.exports = mongoose.model('Question', questionSchema); // the model