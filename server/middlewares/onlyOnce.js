const Answer = require('../models/answer')

module.exports = (req, res, next) => {
  Answer.findOne({
    user: req.decoded._id,
    question: req.params.questionid
  })
  .then(row =>{
    if(!row) next()
    else res.status(400).json({
      message: 'Cannot answer twice to the same question'
    })
  })
  .catch(err =>{
    res.status(500).json({
      message: 'onlyOnce catch'
    })
  })
}