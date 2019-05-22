const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
class UserController {
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
            res.status(400).json(err)
            
        })

    }

    static login(req, res){
        console.log('masukkk')
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
                console.log(dataUser)
                console.log(payload);
                console.log(token);
                console.log('masuk else sebelum res status')
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