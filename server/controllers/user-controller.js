const jwt = require("../helpers/jwt-helper");
const User = require("../models/user");
const bcrypt = require("../helpers/bcryptjs-helper");

class UserController {
  static login(req, res, next) {
    User.findOne({ email: req.body.email.toLowerCase() })
      .then((user) => {
        if (!user) {
          const err = { status: 401, message: "Wrong username/password" };
          next(err);
          return;
        }

        const loggedIn = bcrypt.compareSync(req.body.password, user.password);
        if (!loggedIn) {
          const err = { status: 401, message: "Wrong username/password" };
          next(err);
          return;
        }

        const userData = {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          displayPicture: user.displayPicture,
        };

        const token = jwt.sign(userData);
        userData.token = token;
        res.status(200).json(userData);
      })
  }

  static createUser(req, res, next) {
    console.log(req.body);
    const { email, fullName, password } = req.body;
    User.create({ email, fullName, password })
      .then((user) => {
        const userData = {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          displayPicture: user.displayPicture,
        };

        const token = jwt.sign(userData);
        userData.token = token;
        res.status(201).json(userData);
      })
      .catch((err) => {
        err.status = 400;
        next(err);
      });
  }

  static addTag(req, res, next) {
    console.log(req.body)
    const { tag } = req.body;
    const options = { new: true, useFindAndModify: false, runValidators: false };
    User.findByIdAndUpdate(req.authenticatedUser.id, { $push: { tags: tag } }, options)
      .then((user) => {
        console.log(user);
        res.status(200).json(user);
      })
      .catch((err) => {
        next(err);
      })
  }

  static getUser(req, res, next) {
    User.findById(req.authenticatedUser.id)
      .select("tags")
      .then((user) => {
        console.log("getUser success");
        res.status(200).json(user);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;