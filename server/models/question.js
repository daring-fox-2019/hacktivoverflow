const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;