const jwt = require('jsonwebtoken')

module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: '1 day' })
    },
    verify: (token) => {
        return jwt.verify(token, process.env.SECRET)
    }
}