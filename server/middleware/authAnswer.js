const Answer = require('../models/answer')
module.exports = {
    authorizationAnswer: function (req, res, next) {
      console.log(req, 'ISI REQ');
      
      Answer.findOne({_id : req.params.answerId})
        .then(data => {
          if (data.userId.toString() == req.authenticatedUser.id.toString()) {
            next()
          } else {
            
            res.status(401).json({
              errors: {
                message: 'You dont have access for modify this answer'
              }
            })
          }
        })
        .catch(err => {
          res.status(400).json(err)
        })
    }
  } 