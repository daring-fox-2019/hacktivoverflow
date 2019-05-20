const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = {
    Answer: Answer,
    addAnswer(id, questionId, answer, description) {
        return Answer.create({
            answer,
            question: questionId,
            description,
            owner: id,
        })
    },
    showAllAnswers() {
        return Answer.find({}).populate('owner')
    },
    showOneAnswer(answerId){
        return Answer.findOne({_id:answerId})
    },
    updatePutAnswer(answerId, answer, description, upvotes, downvotes, question, owner){
        return Answer.updateOne({_id:answerId},{answer,description,upvotes,downvotes,question,owner})
    },
    deleteAnswer(answerId){
        return Answer.deleteOne({_id: answerId})
    },
    upvote(answerId, id){
        return Answer.updateOne({_id: answerId}, {$push: {upvotes: id}})
    },
    downvote(answerId, id){
        return Answer.updateOne({_id: answerId}, {$push: {downvotes: id}})
    }
}