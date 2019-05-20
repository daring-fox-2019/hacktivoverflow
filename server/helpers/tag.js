const tagModel = require('../models/tag')

module.exports = {
  tag(data) {
    data.tags.forEach(element => {
      tagModel.findOne({ name: element })
        .then(data => {
          if (!data) {
            tagModel.create({ name: element, count: 1 })
              .then(() => { })
          } else {
            tagModel.findByIdAndUpdate(data._id, { count: data.count + 1 }, { useFindAndModify: true })
              .then(() => { })
          }
        })
    });
  }
}