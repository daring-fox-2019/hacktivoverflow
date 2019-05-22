const User = require("../models/user");
const Question = require("../models/question");
const jwt = require("../helpers/jwt-helper");

module.exports = {
  authentication: function(req, res, next) {
    try {
      req.authenticatedUser = jwt.verify(req.headers.token);
      User.findById(req.authenticatedUser.id)
        .then((user) => {
          if (user) {
            next();
          } else {
            res.status(401).json({ message: "You need to login first" });
          }
        })
        .catch((err) => {
          next(err);
        });
        
    } catch(err) {

      console.log(err);
      res.status(400).json({ message: "Invalid token" });
    }
  },

  authorization: function(req, res, next) {
    Question.findById(req.params.id)
      .then((question) => {
        if (String(question.userId) === req.authenticatedUser.id) {
          next();
        } else {
          res.status(401).json({ message: "You have no access to do that" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}