const User = require('../models/user')
const { sign, verify } = require('../helpers/jwt')
const { hash, compare } = require('../helpers/bcrypt')

class userController {
    static findAll(req, res) {
        User
            .find({})
            .then((allUsers) => { res.status(200).json(allUsers) })
            .catch((err) => { res.status(500).json(err) })
    }

    static create(req, res) {
        const { first_name, last_name, email, password } = req.body
        User
            .create({ first_name, last_name, email, password })
            .then((createdUser) => { res.status(201).json({ message: 'Thank you for registering!', createdUser }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static update(req, res) {
        const { first_name, last_name, email, password } = req.body
        const { id } = req.params
        User
            .findByIdAndUpdate(id, { first_name, last_name, email, password }, { new: true })
            .then((updatedUser) => { res.status(200).json({ message: 'Updated data!', updatedUser }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static delete(req, res) {
        const { id } = req.params
        User
            .findByIdAndDelete(id)
            .then((deletedUser) => { res.status(200).json({ message: 'Deleted user!', deletedUser }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static signUp(req, res) {
        const { first_name, last_name, email, password } = req.body
        User
            .create({ first_name, last_name, email, password })
            .then((createdUser) => { res.status(201).json({ message: 'Thank you for registering!', createdUser }) })
            .catch((err) => { res.status(500).json(err) })
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                    else {
                        const { id, first_name, last_name, email } = findOneUser
                        const payload = { id, first_name, last_name, email }
                        const token = sign(payload)
                        req.headers.token = token
                        res.status(200).json({ message: 'You have successfully logged in!', token, details: payload })
                    }
                }
            })
            .catch((err) => { res.status(500).json(err) })
    }
}
module.exports = userController