const mongoose = require('mongoose');
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type : Schema.Types.ObjectId, ref : 'User' }],
  userId: {
    type : Schema.Types.ObjectId, 
    ref : 'User'
  },
},{
  timestamps: true
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question