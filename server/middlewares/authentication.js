const { verify } = require('../helpers/jwt')
const User = require('../models/userModel')

module.exports = (req, res, next) => {
    try {
        const decoded = verify(req.headers.token)

        User.findOne({ email : decoded.email})
            .then((user)=> {
                if (user) {
                    req.authenticatedUser = decoded
                    next()
                } else {
                    res.status(401).json({ type: 'AUTHENTICATION ERROR', message: 'You do not have access to this page!' })
                }
            })
    } catch (error) {
        res.status(401).json({ type: 'AUTHENTICATION ERROR', message: 'You do not have access to this page!' })
    }
}