const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const fiveSec = require('../helpers/cron')

class UserController {
    static register(req,res) {
        const { email, name, password, role} = req.body
        const create_obj = {email, name, password, role}

        User.create(create_obj)
        .then(created => {
            const { _id, email, name} = created
            const to_be_signed = {
                _id,
                email,
                name,
            }
            const token = sign(to_be_signed)
            const to_be_send = {...to_be_signed, token}

            res.status(201).json(to_be_send)
        })
        .catch(err => {
            let message;
            if(err.errors.email) {
                message = err.errors.email.message
            } else if (err.errors.name) {
                message = err.errors.name.message
            } else if (err.errors.password) {
                message = err.errors.password.message
            } else {
                message = err.message
            }
            res.status(500).json({
                error: err,
                message
            })
        })
    }

    static login(req,res) {
        const { email, password } = req.body
        User.findOne({email})
        .then(found => {
            if(found) {
                if(compare(password, found.password)) {
                    const { _id, email, name, tags } = found
                    const to_be_signed = { _id, email, name, tags }
                    const token = sign(to_be_signed)

                    res.status(200).json({ token, _id, name, email })

                    delete found.password
                    found.lastLogin = new Date()
                    //this will change user last login ~ :-)
                    User.findOneAndUpdate({_id:found._id}, {lastLogin: new Date()})
                    .then(doc => {
                        console.log(doc)
                        console.log('success update last login')
                    })
                } else {
                    res.status(400).json({message: 'Invalid email/password'})
                }
            } else {
                res.status(400).json({message: 'Invalid email/password'})
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error when login user'
            })
        })
    }

    static updateTag(req,res) {
        const { tags } = req.body
        const { _id } = req.decoded

        User.findOneAndUpdate({_id}, {tags}, {new:true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error while updating tag user'
            })
        })
        
    }

    static fetchTag(req,res) {
        const { _id } = req.decoded

        User.findOne({_id})
        .then(data => {
            res.status(200).json(data.tags)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error while getting tag user'
            })
        })
        
    }
}
module.exports = UserController