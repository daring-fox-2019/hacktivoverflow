const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema({
    answer: {
        type: String,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'Oops, cannot answer without question :(']
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    // comments: [
    //     {
    //         type: Schema.Types.ObjectId, ref: 'Comment'
    //     }
    // ],
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
    
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer