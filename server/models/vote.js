const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let voteSchema = new Schema({
    by:{ type: Schema.Types.ObjectId, ref: 'User' },     
    on: Schema.Types.ObjectId,

    // answersUp:[{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    // commentsUp:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // questionsUp:[{ type: Schema.Types.ObjectId, ref: 'Question' }],

    // answersDown:[{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    // commentsDown:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // questionsDown:[{ type: Schema.Types.ObjectId, ref: 'Question'}],

},  { timestamps: { createdAt: 'created_at',updatedAt: 'updated_at'}})

let Vote = mongoose.model('Vote', voteSchema)
module.exports = Vote

