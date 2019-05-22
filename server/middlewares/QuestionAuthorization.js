const Question = require('../models/Question');

module.exports = (req, res, next) => {
    Question.findOne({ _id: req.params.id })
        .then(question => {
            console.log(req.params.id);
            console.log('ini req.decoded');
            console.log(req.decoded);
            console.log('ini question');
            console.log(question);
            if (question.user.toString() === req.decoded._id.toString()) {
                next()
            }
            else {
                res.status(403).json({ err: "Forbidden" })
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
}