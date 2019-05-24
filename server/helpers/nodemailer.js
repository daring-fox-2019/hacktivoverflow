const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_TESTING,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL_TESTING,
    to: '', 
    subject: 'Welcome to </>overflow', 
    html: '<p>Hellooo Good People, welcome to </>overflow</p>' 
};

module.exports = {transporter, mailOptions}
