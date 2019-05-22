const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
  voteType: {
    type: String,
    default: 'up'
  },
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Vote = mongoose.model('vote', voteSchema)

module.exports = Vote
