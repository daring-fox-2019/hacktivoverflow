const jwt = require('../helpers/jwt')
const User = require('../models/User')

module.exports = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.token)
        User.findOne({ _id: req.decoded._id })
            .then(user => {
                if (user) {
                    console.log();
                    
                    next()
                } else {
                    res.status(401).json("Unautheticated")
                }
            })
    } catch (err) {
        res.status(500).json(err)
    }
}