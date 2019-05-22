const User = require('../models/user')
const Helper = require('../helpers/helper')

class UserController {
    static register(req, res) {        
        const {email, password, username} = req.body

        User.create({
            username, email, password
        })
        .then(user=> {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static list(req, res) {
        User.find({})
        .then(user=> {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json({msg:err})
        })
    }

    static login(req, res) {
        const {email, password} = req.body

        User.findOne({
            email
        })
        .then(user => {
            if(!user) {
                throw 'Username/password wrong'
            } else {
                if( Helper.comparePassword(password, user.password) ) {
                    let token = Helper.generateJWT({
                        email: user.email,
                        username: user.username,
                        id: user._id
                    });

                    let finalToken = {
                        token,
                        id: user._id,
                        username: user.username,
                        email: user.email
                    };

                    res.status(200).json(finalToken)
                }else{
                    throw 'Username/password wrong'
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({msg: err})
        })
    }

    static findOne(req, res) {
        const id = req.params.id ? req.params.id : req.headers.id

        User
        .findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static delete(req, res) {
        User
        .findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = UserController
