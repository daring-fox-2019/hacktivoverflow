var CronJob = require('cron').CronJob;
const User = require("../models/user")
const kue = require('kue')
const queue = kue.createQueue();
const transporter = require('../helpers/nodemailer')
var oneMinute = 
    new CronJob('0 0-6 * * * *', function() {
        //Cron will process the queue from below
        //“At minute 0 past every hour from 0 through 6.” 
        //sending email once an hour :-)
        //for every user not logged in for more than 7 days >.<
        queue.process('testing', 1, function(job, done) {
            // console.log(job)
            console.log(job.data.email)
            console.log(job.data.lastLogin)
            const now = new Date().getTime()
            const nowminus7 = new Date().getTime()
            const lastLogin = new Date(job.data.lastLogin).getTime()
            const batas = 7*24*60*60*1000

            // console.log(now, 'now')
            // console.log(now-lastLogin, 'selisih')
            // console.log(batas, 'batas')
            // console.log((now - lastLogin) > batas)

            if((now - lastLogin) > batas) {
                console.log('Setting up email beep beep..');
                const email_obj = {
                    from: 'michaelrs.mailer@gmail.com',
                    subject: "welcome",
                    html: `<p>Hi ${job.data.name}</p>
                            <p>It's been a while since you're logged in, we've missed you!</p>
                            <p>We need support from our loyal visitors to keep our server running </P>
                            <p>Your support means huge for us \>.\< </P>
                            <p>Here is some article that you might be interested in:</p>
                            <p>- test<p>
                            <p>- test<p>

                            <p>See you :-)</p>
                            <br>
                            <p>Sincerely, </p>
                            <p>Hacktivoverflow</p>
                            `
                }

                email_obj.to = job.data.email
                transporter.sendMail(email_obj, function(error, info) {
                    if(error) {
                        return console.log(error)
                    } else {
                        console.log('email seeeent')
                        done ()
                    }
                })
                done()
            } else {
                done()
            }
        })
      }, null, true, 'Asia/Jakarta');

var perWeek = new CronJob('0 0 * * 0 *', function() {
    //“At 00:00 on Sunday.” 
    //check all user then create queue based on it
    //will create queue for every user, checking last Login
    User.find()
    .then(found => {
        // console.log(found)
        console.log('user checking run now')
        found.forEach(el => {
            var job = queue.create('testing', el)
            .save(function(err) {
                if(!err) console.log('queue created!')
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}, null, true, 'Asia/Jakarta')

module.exports = {
    oneMinute,
    perWeek,
}