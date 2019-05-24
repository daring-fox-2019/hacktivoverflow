const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/hacktivoverflow',{ useNewUrlParser: true } );

let answerSchema = new Schema({
    description : String,
    userId      : String,
    questionId  : String,
    upVotes: [{type: Schema.Types.ObjectId, ref : 'user'}],
    downVotes: [{type: Schema.Types.ObjectId, ref : 'user'}]
})

let Answer = mongoose.model('answer', answerSchema)

module.exports = Answer