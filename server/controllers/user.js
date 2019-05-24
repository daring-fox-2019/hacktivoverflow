const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const {verify} = require('../helpers/jwt')
class UserController {
    static getDecode(req, res){
        const decode = verify(req.headers.token)
        res.status(200).json(decode)

    }

    static signUp(req, res){
        const {name, email, password} = req.body
        User.create({
            name,
            email,
            password
        })
        .then(function (data) {
            res.status(201).json({
                msg: 'register success'
            })
            
        })
        .catch(function (err) {
            res.status(400).json(err.message)
            
        })

    }

    static login(req, res){
        let {email, password} = req.body
        User.findOne({
            email
        })
        .then(function (dataUser) {
            if(!dataUser){
                res.status(401).json({
                    msg: 'email/password incorrect'
                })

            }else if(!compare(password, dataUser.password)){
                res.status(401).json({
                    msg : 'Email/Password is incorrect'
                })

            }else {
                console.log('masuuk else')
                const {id, email} = dataUser
                const payload = {id, email}
                const token = sign(payload)
                res.status(200).json({
                    msg : 'you have successly logged in',
                    token : token,
                    details: payload
                })
            }
            
        })
        .catch(function (err) {
            res.status(500).json(err)
            
        })
    }
}

module.exports = UserController