const Answer = require('../models/answer')
const Tag = require('../models/tag')
const Question  = require('../models/question')

class AnswerController {

    static findOne(req, res) {
        console.log('masuk findone');
        console.log(req.params.answerId);
    
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian cari ans');
                res.status(400).json(err)
            })
    }

    static findByQuestion(req, res) {
        // console.log('apa??? dpt ga??', req.params.questionId);

        Answer.find({
                questionId: req.params.questionId
            })
            .populate('userId')
            .then(found => {
                // console.log('masuk', found, '////////////////asdasdasd');

                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian cari ans');
                res.status(400).json(err)
            })
    }

    static async createAnswer(req, res) {
        // console.log(req.authenticatedUser.id, 'siapa login');
        try {
            let created =  await Answer.create({
                ...req.body,
                userId: req.authenticatedUser.id,
                upVotes: [],
                downVotes: []
            })
            await Question.findByIdAndUpdate(req.body.questionId, {$push : {answers : created._id}})
            res.status(201).json(created)
        } catch (error) {
            res.status(500).json(error)
        }
        // console.log('isi req body, ada qs id ga?', req.body);
        // Answer.create({
        //         ...req.body,
        //         userId: req.authenticatedUser.id,
        //         upVotes: [],
        //         downVotes: [],
        //     })
        //     .then(created => {
        //         // console.log('berhasil bikin ans');
        //         res.status(201).json(created)
        //     })
        //     .catch(err => {
        //         console.log(err, 'bagian create ans');
        //         res.status(400).json(err)
        //     })
    }

    static deleteAnswer(req, res) {
            
        Answer.findByIdAndRemove({
                _id: req.params.answerId
            })
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err.response, 'err bagian delete ans');
                res.status(400).json(err)
            })
    }

    static updateAnswer(req, res) {
        Answer.findByIdAndUpdate({
                _id: req.params.answerId
            }, {...req.body}, {new : true})
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(400).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian update ans');
                res.status(400).json(err)
            })
    }

    static async upVote(req, res) {
        try {       
            let jawaban = await Answer.findById(req.params.answerId)
            let idxUp = jawaban.upVotes.find((x) => {return x == req.authenticatedUser.id})
            let idxDown =  jawaban.downVotes.find((x) => {return x == req.authenticatedUser.id})

            if (!idxUp && !idxDown) {
                jawaban.upVotes.push(req.authenticatedUser.id)
                await jawaban.save()
            } else if (!idxUp && idxDown) {
                jawaban.downVotes =  jawaban.downVotes.filter(el => {return el.toString() != req.authenticatedUser.id}) 
                jawaban.upVotes.push(req.authenticatedUser.id)
                await jawaban.save()
            } else if (idxUp && !idxDown) {
                res.status(400).json({message : 'You have already upvoted'})
            }
            res.status(200).json(jawaban)
        } catch (error) {

            console.log(error, 'AAOAOAAO');
            
            res.status(500).json(error)
        }
    }

    static async downVote(req, res) {
        try {            
            let jawaban = await Answer.findById(req.params.answerId)
            let idxUp = jawaban.upVotes.find((x) => {return x == req.authenticatedUser.id})
            let idxDown =  jawaban.downVotes.find((x) => {return x == req.authenticatedUser.id})

            if (!idxUp && !idxDown) {
                jawaban.downVotes.push(req.authenticatedUser.id)
                await jawaban.save()
            } else if (idxUp && !idxDown) {
                jawaban.upVotes = jawaban.upVotes.filter(user => user.toString() != req.authenticatedUser.id.toString())
                jawaban.downVotes.push(req.authenticatedUser.id)
                await jawaban.save()
            } else if (!idxUp && idxDown) {
                res.status(400).json({message : 'You have already downvoted'})
            }
            res.status(200).json(jawaban)
        } catch (error) {
            res.status(500).json(error)
        }
       
    }
}

module.exports = AnswerController