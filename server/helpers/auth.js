const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = (str) => bcrypt.hashSync(str)

const createToken = (user) => jwt.sign({
  _id: user._id,
  email: user.email
}, process.env.JWT_SECRET_KEY)

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY)

const comparePassword = (str, hash) => bcrypt.compareSync(str, hash)

module.exports = {
  hashPassword,
  createToken,
  verifyToken,
  comparePassword
}
