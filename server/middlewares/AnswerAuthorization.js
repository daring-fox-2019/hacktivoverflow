const Answer = require('../models/Answer');

module.exports = (req, res, next) => {
    Answer.findOne({ _id: req.params.id })
        .then(answer => {
            console.log(req.params.id);
            console.log(answer.user.toString());
            
            
            if (answer.user.toString() === req.decoded._id.toString()) {
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