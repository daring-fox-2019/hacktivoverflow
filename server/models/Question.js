const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
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
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        default: []
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    watchTags: [{type: Array}],
})

const Question = mongoose.model('Question', questionSchema)

module.exports = {
    Question: Question,
    addQuestion(id, question, description, watchTags) {
        return Question.create({
            question,
            description,
            owner: id,
            watchTags,
        })
    },
    showAllQuestions() {
        return Question.find({})
        .populate('answers')
        .populate('owner')
    },
    showOneQuestion(questionId){
        return Question.findOne({_id:questionId})
    },
    updatePutQuestion(questionId,question,description,upvotes,downvotes,answers,owner, watchTags){
        return Question.updateOne({_id:questionId},{question,description,upvotes,downvotes,answers,owner, $push: {watchTags: watchTags}})
    },
    deleteQuestion(questionId){
        return Question.deleteOne({_id: questionId})
    },
    upvote(questionId, id){
        return Question.updateOne({_id: questionId}, {$push: {upvotes: id}})
    },
    downvote(questionId, id){
        return Question.updateOne({_id: questionId}, {$push: {downvotes: id}})
    },
    addAnswer(id,questionId){
        return Question.updateOne({_id: questionId}, {$push: {answers: id}})
    }
}