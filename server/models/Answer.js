const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    description: {
        type: String,
        required: [true, "Please fill in your answer"]
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    createdAt: Date,
    updatedAt: Date
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer