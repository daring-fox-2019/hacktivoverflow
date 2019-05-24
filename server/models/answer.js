const mongoose = require('mongoose')
const {Schema} = mongoose
const Question = require('../models/question')
const answerSchema = new Schema({
    description: String,
    upVote:[{type: Schema.Types.ObjectId, ref: 'User'}],
    downVote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: Date,
    updatedAt: Date,
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    idQuestion: {type: Schema.Types.ObjectId, ref: 'Question'},
})
let dataQuestion
answerSchema.post('save',  (doc,next) => {
  doc.populate({path:'idUser', select: 'name'}).execPopulate()
  .then(()=>{
      console.log(doc)
      dataQuestion = doc
      return Question.findOne({_id:dataQuestion.idQuestion})
  })
  .then(data=>{
      data.answers.push(dataQuestion._id)
      data.save()
  })
  .catch(err=>{
      console.log(err)
  })
    next()

    
})



const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer