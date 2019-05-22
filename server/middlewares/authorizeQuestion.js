const { verify } = require('../helpers/jwt')
const Question = require('../models/question')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Question
        .findById({ _id: req.params.QuestionId })
        .then((findOneQuestion) => {
            if (findOneQuestion.UserId == decoded.id) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}