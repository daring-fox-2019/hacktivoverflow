const UserModel = require('../models/User')
const { createToken } = require('../helpers/auth')

class Auth {
  static register (req, res) {
    UserModel
      .create({
        email: req.body.email,
        password: req.body.password
      })
      .then((user) => res.status(201).json({ user }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static login (req, res) {
    UserModel
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user && user.comparePassword(req.body.password)) {
          let jwtToken = createToken(user)

          res.status(200).json({
            user: {
              _id: user._id,
              email: user.email,
              tags: user.tags
            },
            jwtToken
          })
        } else {
          res.status(400).json({ message: 'Email or password wrong' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Auth
