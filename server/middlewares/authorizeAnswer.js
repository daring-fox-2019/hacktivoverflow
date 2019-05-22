const { verify } = require('../helpers/jwt')
const Answer = require('../models/answer')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    Answer
        .findById({ _id: req.params.AnswerId })
        .then((findOneAnswer) => {
            if (findOneAnswer.UserId == decoded.id) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}