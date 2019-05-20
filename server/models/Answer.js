const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    description: {
        type: String,
        required: [true, "Please fill in your answer"]
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: Schema.Types.ObjectId, ref: "Question" }
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer