const { verify } = require('../helpers/jwt');
const { User, Question, Answer } = require('../models');

module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      next({ status: 401, message: 'You must login to access this endpoint', origin: 'Helpers Authenticate'})
    } else {
      let decoded = verify(token, next);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           next();
         } else {
           next(({ status: 401, message: 'User is not valid', origin: 'Helpers Authenticate'}))
         }
       })
       .catch(err => {
         next({ status: 500, message: err.mesasge, origin: 'Helpers Authenticate'})
       })
    }
  },
  authorize: function(req, res, next) {
    let { questionId, answerId } = req.params
    Promise.all([
      Question.findOne({ _id: questionId }),
      Answer.findOne({ _id: answerId }),
    ])
      .then(result => {
        let authId = (result[0]) ? result[0].user.toString() : result[1].user.toString()
        if(authId != req.user._id.toString()) {
          next({ status: 401, message: 'Cannot write others question', origin: 'Helpers Authrize'})
        } else {
          next()
        }
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'Helpers Authorize'})
      })
  },
}
