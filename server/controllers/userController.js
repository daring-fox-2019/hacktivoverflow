const User = require('../models/userModel')
const { verifyPassword } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt')

class UserController {
    static login(req, res, next){
        let { email, password } = req.body
        User.findOne({ email })
            .then(user=>{
                if(user && verifyPassword(password, user.password)){
                    const accessToken = createToken({
                        userId: user._id,
                        email: user.email
                    })
                    res.status(200).json({
                        token: accessToken,
                        name: user.name,
                        email: user.email,
                        id: user._id,
                    })
                }else{
                    next({ name: 'loginFailed'})                
                }
            })
            .catch(err=>{
                next(err)                
            })
    }
    static register(req, res, next){
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
        .then((newUser) => {
            res.status(201).json(newUser)
        })
        .catch((err) => {
            next(err)
        })
    }
    static delete(req, res, next) {
        User.findByIdAndDelete(req.params.id)
        .then((deleted)=>{
            res.status(200).json(deleted)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static gets(req, res, next){
        User.find({})
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(err=>{
            next(err)                
        })
    }
}

module.exports = UserController