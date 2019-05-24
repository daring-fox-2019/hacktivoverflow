const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please specify tag']
    },

})

const Tag  = mongoose.model('Tag', tagSchema)

module.exports = Tag