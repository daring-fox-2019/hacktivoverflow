const { User } = require("../models/index");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");
const {transporter, mailOptions} = require('../helpers/nodemailer')
const kue = require('kue')
const nodemailer = require('nodemailer')
const queue = kue.createQueue()

class UserController {
  static create(req, res, next) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    newUser.save()
      .then(user => {
        mailOptions.to = req.body.email
        queue.create("Register email").save()
        res.status(201).json(user);
      })
      .catch(err => {
        next(err);
      });
  }
  static login(req, res, next) {
    User.findOne({
      email: req.body.email
    })
    .select(['+password'])
    .then(user => {
      if (user) {
        let check = compareHash(req.body.password, user.password);
        if (check) {
          let token = generateJWT({
            email: user.email,
            id: user._id
          });
          res.status(201).json({
            token: token
          });
        } else {
          next(new Error("Invalid email/password"));
        }
      } else {
        next(new Error("Invalid email/password"));
      }
    })
    .catch(err => {
      next(err);
    });
  }

  static getPayload(req,res){
    let decode = decodeJWT(req.headers.token)
    User.findById(decode.id)
    .then(user=>{
      res.status(200).json(user)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  
}

queue.process('Register email',function(job,done){
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
      done()
 });
})

module.exports = UserController