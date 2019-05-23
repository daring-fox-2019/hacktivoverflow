const UserModel = require('../models/User')

class User {
  static findById (req, res) {
    UserModel
      .findById(req.params.user_id)
      .then((user) => {
        if (user) {
          res.status(200).json({
            user: {
              _id: user._id,
              email: user.email,
              tags: user.tags
            }
          })
        } else {
          res.status(400).json({ message: 'User Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static updateTags (req, res) {
    req.user.tags = req.body.tags
    req.user.save()
      .then((user) => res.status(200).json({ user }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = User
