const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/hacktivoverflow',{ useNewUrlParser: true } );

let questionSchema = new Schema({
    title       : String,
    description : String,
    userId      : String,
    answerList  : [{type: Schema.Types.ObjectId, ref : 'answer'}],
    upVotes: [{type: Schema.Types.ObjectId, ref : 'user'}],
    downVotes : [{type: Schema.Types.ObjectId, ref : 'user'}]
})

let Question = mongoose.model('question',questionSchema)

module.exports = Question