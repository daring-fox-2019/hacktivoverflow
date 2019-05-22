const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.headers.hasOwnProperty('token')) {
        console.log(req.headers.token, 'ini token');
        jwt.verify(req.headers.token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json({
                    msg: 'you have to login first'
                })
            } else {
                req.loggedUser = decoded
                next()
            }
        })
    } else {
        res.status(401).json({
            msg: 'you have to login first'
        })
    }
}