const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  content: {
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  }
}, {
  timestamps: true,
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;