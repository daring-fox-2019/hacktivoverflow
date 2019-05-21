const User = require('../models/User.js')
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

class UserController {
    static register(req, res) {
        console.log(`my bodyh`);
        
        console.log(req.body);
        
        const { username, email, password } = req.body
        User
            .create({ username, email, password })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const myToken = jwt.sign({
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        })
                        res.status(200).json({
                            token: myToken,
                            username: user.username,
                            email: user.email
                        })
                    } else {
                        res.status(400).json("Wrong email / password")
                    }
                } else {
                    res.status(400).json("Wrong email / password")
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        User
            .findOne({ _id: req.params.id })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        User
            .find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController