const Question = require('../models/questionModel');
const User = require('../models/userModel')
const { verifyToken } = require('../helper/jwt')

module.exports = function (req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token);
        User.findOne({
            email: decoded.email
        })
            .then(user => {
            return Question.findById(req.params.id)
                .then((question) => {
                    if (user.id == question.author) {
                        next()
                    } else {
                        throw { message: 'You dont have access' }
                    }
                })
            })
            .catch(err => {
                res.status(404).json({ msg: err.message })
            })
    } catch (error) {
        throw 'You dont have access'
    }
} 