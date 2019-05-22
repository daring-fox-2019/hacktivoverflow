const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'fahmi.projects@gmail.com',
         pass: process.env.EMAIL_PASS
     }
 });

 const mailOptions = {
  from: 'fahmi.projects@gmail.com', // sender address
  to: '', // list of receivers
  subject: 'Welcome', // Subject line
  html: '<p>WELCOME TO HACKTIV OVERFLOW!</p>'// plain text body
};

module.exports = {
  transporter, mailOptions
}