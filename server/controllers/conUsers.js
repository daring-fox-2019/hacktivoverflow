const UserModel = require('../models/User')
const hashing = require('../helpers/hashing')
const tokening = require('../helpers/jwt')
const cronJob = require('../helpers/kueSendEmail')

module.exports = {
    register: (req, res, next) => {
        let name = req.body.name
        let password = req.body.password
        let pp = req.body.pp
        let email = req.body.email
        let watchTags = req.body.watchTags
        let hashedPass = hashing.generateHash(password)
        UserModel.register(name, hashedPass, pp, email, watchTags)
            .then(result => {
                cronJob.sendEmailWelcome(email)
                res.status(201).json(result)
            })
            .catch(err => {
                next(err)
            })
    },
    login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        UserModel.findOneByEmail(email)
            .then(result => {
                console.log(result)
                if (!result) {
                    res.status(400).json("Please check your email!")
                } else {
                    if (hashing.compareHash(password, result.password)) {
                        let x = tokening.generateToken({
                            name: result.name,
                            pp: result.pp,
                            email: result.email,
                            id: result._id
                        })
                        res.status(200).json({
                            jwtoken: x,
                            userId: result._id,
                            name: result.name,
                            pp: result.pp,
                            watchTags: result.watchTags
                        })
                    } else {
                        res.status(400).json('Please check your password!')
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}