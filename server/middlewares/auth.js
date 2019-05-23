const UserModel = require('../models/User')
const { verifyToken } = require('../helpers/auth')

const loggedIn = (req, res, next) => {
  let token = req.headers.authorization

  if (token) {
    try {
      let payload = verifyToken(token)
      UserModel
        .findById(payload._id)
        .then((user) => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(400).json({ message: 'Invalid Token' })
          }
        })
    } catch (e) {
      res.status(400).json({ message: 'Invalid Token' })
    }
  } else {
    res.status(400).json({ message: 'Missing Token' })
  }
}

module.exports = { loggedIn }
