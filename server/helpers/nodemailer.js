"use strict";

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL_USER, // generated ethereal user
      pass: process.env.GOOGLE_EMAIL_PASS // generated ethereal password
    }
});


module.exports = transporter