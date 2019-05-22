const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Content is required"],
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  tags: [{
    type: String,
  }],
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  }
}, {
  timestamps: true,
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;