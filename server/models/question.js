const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    question: {
        type: String,
    },
    description: {
        type: String,
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    // comments: [
    //     {
    //         type: Schema.Types.ObjectId, ref:'Comment'
    //     }
    // ],
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    tags: {type: Array}
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}

});
const Question = mongoose.model('Question', questionSchema)
module.exports = Question