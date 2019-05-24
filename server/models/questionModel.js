const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required'],
        minlength: [10, 'Description is too short'],
    },
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        default : 0
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        default : 0
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    tags : [{
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
},{
    timestamps : true
})

questionSchema.pre('findByIdAndUpdate')

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;