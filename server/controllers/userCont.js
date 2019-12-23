const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers/bcrypt')
const randomPass = require('../helpers/randomPass')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static readOne(req,res){
    User.findOne({
      _id: req.params._id
    })
    .populate({
      path: 'questions',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'user' }
  })
    .populate('answers')
    .then(row =>{
      res.status(200).json(row)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read one User",
        err
      })
    })
  }
  static GoogleSignIn(req, res) {
    let payload = null;
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        const userid = payload['sub']
        // console.log(payload)
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        if (user) {
          let { _id, name } = user
          let payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.KUNCI, { expiresIn: "7d" })
          console.log('token --->', token, '<---token')
          res.status(200).json({ _id, token, name })
        } else {
          let passRandom = randomPass()
          User.create({
            name: payload.name,
            email: payload.email,
            password: passRandom
          })
            .then((user) => {
              let { _id, name } = user
              let payload = {
                _id: user._id,
                name: user.name,
                email: user.email
              }
              let token = jwt.sign(payload, process.env.KUNCI)
              console.log('token --->', token, '<---token')
              res.status(201).json({ _id, token, name, passRandom })
            })
            .catch((err) => {
              res.status(500).json(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static register(req, res) {
    User
      .create({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
      })
      .then(() => {
        res.status(201).json({
          message: "register success"
        })
      })
      .catch(err => {
        // {
        //   errors: {

        //   }
        // }
        console.log(err)
        if (err.message) {
          res.status(406).json({
            message: `Register failed : ${err.message}`
          })
        }
        else res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          const isSame = comparePass(req.body.password, user.password)
          if (isSame) {
            let { _id, name } = user
            let payload = {
              _id: user._id,
              name: user.name,
              email: user.email
            }
            let token = jwt.sign(payload, process.env.KUNCI, { expiresIn: "7d" })
            console.log('token login -->', token)
            res.status(200).json({
              _id, token, name
            })
          }
          else {
            res.status(403).json({
              message: 'Email atau password salah'
            })
          }
        }
        else {
          res.status(404).json({
            message: "Email not found, please register first"
          })
        }
      })
      .catch(err => {
        if (err.message) {
          res.status(406).json({
            message: `Login failed : ${err.message}`
          })
        }
        else res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }
}

module.exports = UserController