const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "29classic.fox.2019@gmail.com",
    pass: "a123654789."
  }
})

let mailOpt = {
  from: "29classic.fox.2019@gmail.com",
  to: '',
  subject: 'Test nodemailer',
  html: 'Tes uhuy'
}

module.exports = {
  mailOpt, transporter
}