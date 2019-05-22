const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static signin(req, res) {
        User.findOne({
            email: req.body.email
        }).then(found => {
            if (found) {
                let isPasswordValid = bcrypt.compareSync(req.body.password, found.password)
                if (isPasswordValid) {
                    let token = jwt.sign({
                        username: found.name,
                        id: found.id
                    }, process.env.JWT_SECRET)
                    res.status(200).json({
                        msg: "logged in",
                        token,
                        name: found.name,
                        id: found.id,
                    })
                } else {
                    res.status(404).json({
                        msg: "wrong password/username"
                    })
                }
            } else {
                res.status(404).json({
                    msg: "wrong password/username"
                })
            }
        })
    }

    static async register(req, res) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        })
        try {
            let save = await user.save()
            res.json(save)
        } catch (error) {
            res.status(500).json(error.errors)
        }
    }

    static async getUser(req, res) {
        try {
            let user = await User.findById(req.loggedUser.id)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({
                    msg: "user not found"
                })
            }
        } catch (error) {
            res.status(500).json(error.errors)
        }
    }

    static async getUserQuestions(req, res) {
        try {
            let user = await User.findById(req.loggedUser.id).populate('questions')
            if (user) {
                res.json(user.questions)
            } else {
                res.status(404).json({
                    msg: "user not found"
                })
            }
        } catch (error) {
            res.status(500).json(error.errors)
        }
    }

}

module.exports = userController