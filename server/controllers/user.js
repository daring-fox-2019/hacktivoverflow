const { User } = require('../models')
const { hash } = require('../helpers/bcryptjs')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
// const { mailOpt, transporter } = require('../helpers/nodemailer')

class ControllerUser {
  static create(req, res, next) {
    let { name, email, password } = req.body
    let newUser = {
      name, email, password: hash(password)
    }
    User.create(newUser)
      .then(data => {
        // let job = que.create('email').save(err => {
        //   if(err) {
        //     console.log({ err })
        //     console.log(job.id)
        //   }
        // })
        res.status(201).json(data)

      })
      .catch(err => {next({ status: 500, message: err.message, origin: 'ControllerUser.create'})})
  }
  static findAll(req, res, next) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => next({ status: 500, message: err.message, origin: 'ControllerUser.findAll'}))
  }
  static findOne(req, res, next) {
    User.findOne({_id: req.params.userId})
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {next({ status: 500, message: err.message, origin: 'ControllerUser.findOne'})})
  }
  static update(req, res, next) {
    let { tags } = req.body
    User.findOneAndUpdate({_id: req.params.userId}, { tags }, { new: true })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => next({ status: 500, message: err.message, origin: 'ControllerUser.update'}))
  }
  static delete(req, res, next) {
    User.findOneAndDelete({_id: req.params.userId})
      .then(user => {
        const response = {
          message: 'Successfully deleted user.',
          id: req.params.userId
        }
        res.status(200).json(response)
      })
      .catch(err => {next({ status: 500, message: err.message, origin: 'ControllerUser.delete'})})
  }
  
  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          next({ status: 401, message: 'user tidak ada/ password salah', origin: 'ControllerUser.login'})
        } else {
          if (!compare(password, user.password)) {
            next({ status: 401, message: 'user tidak ada/ password salah', origin: 'ControllerUser.login'})
          } else {
            let obj = {
              id: user._id,
              email: user.email
            }
            let token = sign(obj)
            res.status(201).json({
              token,
              id: user._id,
              email,
              name: user.name
            })
          }
        }
      })
      .catch(err => { next({ status: 500, message: err.message, origin: 'ControllerUser.login'}) })
  }
}

// que.process('email', (job, done) => {
//   transporter.sendMail(mailOpt, (err, info) => {
//     if(err) {
//       return console.log(err)
//     } else {
//       done()
//     }
//   })
// })

module.exports = ControllerUser