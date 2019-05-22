const Answer = require('../models/answer')

class answerController {
    static findAll(req, res) {
        const { QuestionId } = req.params
        Answer
            .find({ QuestionId })
            .populate('UserId')
            .then((allAnswers) => { res.status(200).json(allAnswers) })
            .catch((err) => { res.status(500).json(err) })
    }

    static findOne(req, res) {
        const { AnswerId } = req.params
        Answer
            .findOne({ _id: AnswerId })
            .then((findOneAnswer) => { res.status(200).json(findOneAnswer) })
            .catch((err) => { res.status(500).json(err) })
    }

    static findUserAnswers(req, res) {
        const { id } = req.authenticatedUser
        Answer
            .find({ UserId: id })
            .populate('QuestionId')
            .populate('UserId')
            .then((userAnswers) => { res.status(200).json(userAnswers) })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        const { id } = req.authenticatedUser
        const { answer, QuestionId } = req.body
        Answer
            .create({
                answer,
                QuestionId,
                UserId: id,
                upvotes: [],
                downvotes: []
            })
            .then((createdAnswer) => { res.status(201).json({ message: 'Posted answer!', createdAnswer }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static upVote(req, res) {
        const { AnswerId } = req.params
        Answer
            .findById(AnswerId)
            .then((findOneAnswer) => {
                let { upvotes, downvotes } = findOneAnswer
                const { id } = req.authenticatedUser
                let foundUserUpvote = upvotes.find((user) => {
                    return user == id
                })
                let foundUserDownvote = downvotes.find((user) => {
                    return user == id
                })
                if (foundUserUpvote) res.status(400).json({ message: 'You are not allowed to upvote again!' })
                else if (foundUserDownvote) {
                    downvotes = downvotes.filter((user) => {
                        return user != id
                    })
                } else {
                    upvotes.push(id)
                }
                return Answer
                    .findByIdAndUpdate(AnswerId, {
                        upvotes,
                        downvotes
                    }, { new: true })
            })
            .then((updatedAnswer) => {
                res.status(200).json({ message: 'Upvoted an answer!', updatedAnswer })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
    static downVote(req, res) {
        const { AnswerId } = req.params
        Answer
            .findById(AnswerId)
            .then((findOneAnswer) => {
                let { upvotes, downvotes } = findOneAnswer
                const { id } = req.authenticatedUser
                let foundUserUpvote = upvotes.find((user) => {
                    return user == id
                })
                let foundUserDownvote = downvotes.find((user) => {
                    return user == id
                })
                if (foundUserDownvote) res.status(400).json({ message: 'You are not allowed to downvote again!' })
                else if (foundUserUpvote) {
                    upvotes = upvotes.filter((user) => {
                        return user != id
                    })
                } else {
                    downvotes.push(id)
                }
                return Answer
                    .findByIdAndUpdate(AnswerId, {
                        upvotes,
                        downvotes
                    }, { new: true })
            })
            .then((updatedAnswer) => {
                res.status(200).json({ message: 'Downvoted an answer!', updatedAnswer })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        const { AnswerId } = req.params
        const { answer } = req.body
        Answer
            .findByIdAndUpdate(AnswerId, { answer, createdAt: new Date() })
            .then((updatedAnswer) => { res.status(200).json({ message: 'Updated an answer!', updatedAnswer }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static delete(req, res) {
        const { AnswerId } = req.params
        Answer
            .findByIdAndDelete(AnswerId)
            .then((deletedAnswer) => { res.status(200).json({ message: 'Deleteed an answer!', deletedAnswer }) })
            .catch((err) => { res.status(500).json(err) })
    }
}

module.exports = answerController