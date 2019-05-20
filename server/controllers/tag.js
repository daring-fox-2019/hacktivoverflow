const Model = require('../models/tag')

class Tag {
  static findAll(req, res) {
    Model.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = Tag