const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.SERVER_EMAIL,
           pass: process.env.SERVER_PASSWORD
       }
});
   
function emailSender(user) {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: process.env.SERVER_EMAIL,
            to : user.email,
            subject : `Welcome to HacktivOverflow - ${user.firstname}`,
            html : `<div style="font-family: Helvetica;"><h1>Hello, ${user.firstname}</h1><br>Thanks for joining. HacktivOverflow.<br>Now, start raise a question and contribute to the community!</div>`
        }
        
        transporter.sendMail(mailOptions, function(error, response){
            if(error){
                reject(error)
            }
            else{
                console.log("Message sent: " + response);
                resolve(response)
            }
        });
    });
}

module.exports = (data, done) => {
    let user = {
        email: data.email,
        firstname: data.firstname,
        title: data.title
    }

    emailSender(user).then((success) => {
      done();
    })
    .catch((err) => {
      if(400 <= err.status <= 499){
          console.log('Errorr... -> ', err.message);
      }
      return done( new Error(JSON.stringify(err)));
    });
};
