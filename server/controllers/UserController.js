const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tag = require('../models/tag')

class UserController {

    static findById(req, res) {
        User.findById(req.authenticatedUser.id).populate('tags')
        .then(data => {
            console.log(data, '???');
            
            if (data) res.status(200).json(data)
            else res.status(404).json({msg : `No such user`})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
    static async register(req, res) {
        try {
            let newuser = await User.create({email : req.body.email, password : req.body.password, tags : []})
            req.body.tags.forEach(async tagName => {
               let found = await Tag.findOne({name : tagName})
                await User.findByIdAndUpdate({_id : newuser._id}, {$push : {tags : found._id}}, {new : true})
            })
            res.status(201).json(newuser)
        } catch (error) {
            console.log(error);
            
            res.status(400).json(error)
        }
    }

    static signInLocal(req, res) {
    console.log(req.body,'dapet apa ya?');
    
    User.findOne({ email: req.body.email })
        .then(found => {
            if (found) {
                if (!bcrypt.compareSync(req.body.password, found.password)) {
                    res.status(400).json({
                        msg: 'Invalid password/Email'
                    })
                } else {
                    let { email, _id } = found
                    let token = jwt.sign({ id: _id, email }, process.env.JWT_SECRET)
                    console.log('dapat token', token)
                    req.headers.token = token
                    res.status(200).json({ token, email, _id })
                }
            } else {
                console.log('sini')
                res.status(400).json({ msg: 'No such email' })
            }
        })
        .catch(err => {
            console.log(err, 'err bagian login')
            res.status(400).json(err)
        })
    }

    static async deleteTag(req, res) {
        try {
            let found = await User.findByIdAndUpdate(req.authenticatedUser.id, {$pull : {tags : req.params.id}}, {new : true})
            res.status(200).json(found)
        } catch (error) {
            res.status(400).json(err)

        }
    }


}

module.exports = UserController