const jwt = require('jsonwebtoken')

module.exports = {
  generateToken: function (data) {
    let token = jwt.sign(data, process.env.JWT_SALT)
    return token
  },
  verifyToken: function (token) {
    var decoded = jwt.verify(token, process.env.JWT_SALT);
    return decoded
  }
}