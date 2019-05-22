const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tagSchema = new Schema({
  name: String,
  count: Number,
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag