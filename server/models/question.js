const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: [true, 'UserId is required']
    },
    answers : [{
        type : Schema.Types.ObjectId,
        ref : 'Answer'
    }],
    upVotes : {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    downVotes : {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tag'
    }],
}, {timestamps : true})


let Question = mongoose.model('Question', questionSchema)
module.exports = Question
