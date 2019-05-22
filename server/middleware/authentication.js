const jwt = require('jsonwebtoken')
const User = require('../models/user')


module.exports = {
    authentication : function (req, res, next) {
        console.log(req.headers.token, 'daapat token ga??');
        if (req.headers.token) {
            console.log('sini');
            
            try {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                req.authenticatedUser = decoded
                next()
            } catch (e) {
                res.status(401).json({
                    message : ' Invalid token'
                })
            }
        } else {
            console.log('401 not logged in')
            res.status(401).json({
                message : ' You are not logged in'
            })
        }
    }
}