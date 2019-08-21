const User              = require('../models/user');
const { decrypt, sign } = require('../helpers');

class AuthController {
    static register(req, res, next) {
        User
            .create(req.body)
            .then(newUser => {
                res
                    .status(201)
                    .json(newUser);
            })
            .catch(err => {
                if (err.message === 'Email has been taken') {
                    res
                        .status(409)
                        .json({
                            message: err.message
                        })
                } else if (RegExp('validation').test(err.message)) {
                    if (err.errors.email) {
                        res
                            .status(400)
                            .json({
                                message: err.errors.email.message
                            })
                    } else {
                        res
                            .status(403)
                            .json({
                                message: err.message
                            })
                    }
                } else {
                    next(err);
                }
            });
    }

    static login(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        });
                } else {
                    if (decrypt(req.body.password, foundUser.password)) {
                        const token = sign(foundUser._id, foundUser.name);

                        res
                            .status(200)
                            .json({
                                accesstoken: token,
                                watch_tag: foundUser.watch_tag
                            });
                    } else {
                        res
                            .status(401)
                            .json({
                                message: 'Wrong password'
                            });
                    }
                }
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = AuthController;