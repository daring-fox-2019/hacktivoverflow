const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{

    static getAll(req,res){
        User
        .find({})
        .populate('questionList')
        .populate('answerList')
        .then(users =>{
            res.status(201).json(users)
        })
        .catch(err=>{
            console.log(err);
            res.status(501).json({
                msg : `internal server error`,
                err
            })
        })
    }

    static login(req,res){
        User.findOne({email : req.body.email})
        .populate('questionList')
        .populate('answerList')
        .then(user =>{
            if(user){
                let check = bcrypt.compareSync(req.body.password, user.password)
                if(check){
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    let token = jwt.sign(payload, `${process.env.SECRET_KEY}`)
                    res.status(200).send({
                        msg : 'logged in',
                        token,
                        id : user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        questionList : user.questionList,
                        answerList : user.answerList
                    })
                }else{
                    res.status(404).json({
                        msg : 'username/password salah'
                    })
                }
            }else{
                res.status(404).json({
                    msg : 'username/password salah'
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                msg: 'internal server error'
            })
        })
    }

    static register(req,res){
        User
        .create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password: req.body.password
        })
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }
}

module.exports = UserController
