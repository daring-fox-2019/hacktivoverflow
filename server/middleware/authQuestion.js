const Question = require('../models/question')
module.exports = {
    authorizationQuestion: function (req, res, next) {
      console.log(req.params, 'ISI REQ');
      
      Question.findOne({_id : req.params.questionId})
        .then(data => {
          if (data.userId.toString() == req.authenticatedUser.id.toString()) {
            next()
          } else {
            
            res.status(401).json({
              errors: {
                message: 'You dont have access for modify this question'
              }
            })
          }
        })
        .catch(err => {
          res.status(400).json(err)
        })
    }
  } 