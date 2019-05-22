const jwt = require('jsonwebtoken')

const createToken = (user) => jwt.sign({
  _id: user._id,
  email: user.email
}, process.env.JWT_SECRET_KEY)

const verifyToken = (str) => jwt.verify(str, process.env.JWT_SECRET_KEY)

module.exports = { createToken, verifyToken }
