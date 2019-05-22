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
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
    updatedAt: Date
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question