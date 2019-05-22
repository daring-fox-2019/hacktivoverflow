const jwt = require('jsonwebtoken')

module.exports = {
  sign: function (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      // expiresIn: '2h'
    })
  },
  verify: function (token, next) {
    try {
      let result = jwt.verify(token, process.env.JWT_SECRET)
      return result
    } catch(err) {
      next({ status: 401, message: 'Token Expired', origin: 'JWT Verify'})
    }
  }
}