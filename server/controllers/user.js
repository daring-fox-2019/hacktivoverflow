const { hash } = require('../helpers/bcryptjs')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')

class ControllerUser {
  static create (req,res) {
    let { username, email, password } = req.body
    let hashed = hash (password)
    User.create({ username,email,password : hashed })
    .then( data =>{
        let token = sign({email})
        res.status(201).json({ token,username })
    })
    .catch(err =>{
      res.status(400).json({ message : err.message})
    })
  }
  static login(req,res) {
    let { email, password } = req.body
    User.findOne({ email })
    .then(data =>{
      if(!data) {
        res.status(400).json({ message : 'username / password wrong'})
      }else {
        if(!compare(password,data.password)){
        res.status(400).json({ message : 'username / password wrong'})
        }else {
          let token = sign(email)
          let { username }  = data
          res.status(200).json({ token,username })
        }
      }
    })
  }
}

module.exports = ControllerUser