const User = require("../models/usermodel.js")
const jwt = require("jsonwebtoken");
const hashPassword = require("../helpers/hashPassword.js")

class Controller {

    static create(req, res) {
        console.log(`Registering ${req.body.email}`)
        User.find({email: req.body.email})
        .exec()
        .then(found => {
            if(found.length > 0) {
                res.status(409).json({
                    message: "Email is already registered"
                })
            }
            else {
                let newuser = new User({
                    email: req.body.email,
                    password: req.body.password,
                })
        
                newuser.save((err, user) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ err })
                    } else {
                        res.status(201).json({
                            message: "Successfully registered",
                        })
                    }
                })
            }
        })
    }
    
    static login(req, res) {
        console.log(`Logging in ${req.body.email}`)
        User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(!user) {
                res.status(401).json({
                    message: "Invalid username/password"
                })
            }
            else if(user.comparePassword(req.body.password)) {
                let token = jwt.sign({
                    email: user.email,
                    id: user._id,
                }, process.env.JWT_SECRET, { expiresIn: '2d' });
                res.status(200).json({
                    email: user.email,
                    id: user._id,
                    token: token,
                })
            }
            else {
                res.status(401).json({
                    message: "Invalid username/password"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err,
                message: "Server Error",
            })
        })
    }

    static checkLogin(req, res) {
        if(req.userData) {
            res.status(200).json({
                email: req.userData.email,
                id: req.userData.id,
            })
        } else {
            res.status(401).json()
        }
    }

    static delete(req, res) {
        User.remove({email: req.userData.email})
        .exec()
        .then(() => {
            res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
    }

    static updatePassword(req, res) {
        const input = {}
        if(req.body.new) input.password = hashPassword(req.body.new)

        User.findOne({email: req.userData.email})
        .exec()
        .then(user => {
            if(!user) {
                res.status(401).json({
                    message: "Error"
                })
            }
            else if(user.comparePassword(req.body.old)) {
                User.updateOne({email: req.userData.email}, {$set: input})
                .exec()
                .then(updatedUser => {
                    res.status(200).json(updatedUser)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            }
            else {
                res.status(401).json({
                    message: "Input password again"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err,
                message: "Server Error",
            })
        })
    }

    static updateName(req, res) {
        User.findOne({email: req.userData.email})
        .exec()
        .then(user => {
            if(!user) {
                res.status(401).json({
                    message: "Error"
                })
            } else {
                User.updateOne({email: req.userData.email}, {
                    $set: {name: req.body.name}
                })
                .then(updatedUser => {
                    res.status(200).json(updatedUser)
                })
                .catch(err => {
                    res.status(500).json({err})
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err,
                message: "Server Error",
            })
        })
    }
}

module.exports = Controller