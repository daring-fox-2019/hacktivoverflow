const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    tag: {
        type: String,
        validate: {
            validator(tag) {
                return Tag.findOne({tag})
                .then(found => {
                    if(found) return false;
                })
            },
            message: 'Tag must be unique'
        }
    },
    // question: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Question'
    // }
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag