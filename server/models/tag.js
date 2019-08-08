const mongoose = require('mongoose')
const Schema = mongoose.Schema

tagSchema = new Schema({
    name : String,
    questions : [{
        type : Schema.Types.ObjectId,
        ref : 'Question'
    }]
})

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag