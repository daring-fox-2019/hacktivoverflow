const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the answer"]
    },
    description: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question