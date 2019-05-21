const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Comment must not be null']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // question: {type: String,}
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment