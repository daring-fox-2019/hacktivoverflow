const kue = require('kue')
const queue = kue.createQueue()
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        service: 'gmail',
        type: 'Oauth2',
        user: process.env.user,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken
    }
})

module.exports = {
    sendEmailWelcome(to) {
        queue.create('email', {
            title: 'Welcome to Snap Overflow',
            to: to,
            template: 'welcome-email'
        }).save(function (err) {
            if (!err) {
                console.log('mantap')
            }
        })
        queue.process('email', (job, done) => {
            mailer(to)
            done()
        })
    },
    sendWeeklyEmail(to, content) {
        queue.create('emailWeek', {
            tile: 'Here are our weekly list',
            to: to,
            template: 'weekly-email'
        }).save(function (err) {
            if (!err) {
                console.log('mantap')
            }
        })
        queue.process('emailWeek', (job, done) => {
            mailerWeekly(to, content)
            done()
        })
    }
}

function mailer(to) {
    let mail = {
        from: 'qoyyimafiassalam@gmail.com',
        to: to,
        subject: 'Warm Welcome to Snap Overflow!',
        // text: 'Welcome to Snap Overflow. Feel free to ask and answer questions in this small-scale Stack Overflow!'
        html: `
        < !DOCTYPE html >
            <
            html >
            <
            head >
            <
            title > Snap Overflow < /title> <
        meta charset = "UTF-8" >
            <
            meta name    = "viewport"
                 content = "width=device-width, initial-scale=1" >
            <
            style >
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font - family: "Oswald"
            }

        body {
            font - family: "Open Sans"
        } <
        /style> < /
        head >

            <
            body class = "w3-light-grey" >
            <
            div class = "w3-container w3-white w3-margin w3-padding-large" >
            <
            div class = "w3-center" >
            <
            h3 > WELCOME TO SNAP OVERFLOW < /h3> <!-- < h5 > < span class = "w3-opacity"
               id                                                         = "date" > < /span></h5 > -- >
            <
            /div>

            <
            div class = "w3-justify" >
            <
            img src   = "https://storage.cloud.google.com/jualeun-qfs/codecode.jpg?_ga=2.146824306.-415458887.1554453586"
                style = "width:100%"
                class = "w3-padding-16" >
            <
            p > < strong > Dont miss! < /strong> Feel free to ask your question or contributing in answers in thi small scale of Stack Overflow!.</p >
            <
            a href  = "http://snapoverflow.qfs-hacktiv8.com"
              style = "text-decoration: none" >
            <
            button style = "background-color:greenyellow;"
                   type  = "button"
                   class = "w3-button w3-block w3-padding-large w3-red w3-margin-bottom" > Get
        Connected < /button> < /
        a > <
            /div> < /
        div > <
            script >
            document.getElementById('date').innerHTML = new Date().toLocaleDateString({
                timezone: "Asia/Jakarta"
            }) + " " + new Date().toLocaleTimeString({
                timezone: "Asia/Jakarta"
            }) <
            /script> < /
        body > <
            /html>
          `
    }
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

function mailerWeekly(to, content) {
    toSendContent = JSON.stringify(content, null, 2) + "\n \n \n Visit us at http://snapoverflow.qfs-hacktiv8.com"
    for (var i = 0; i < to.length; i++) {
        var mail = {
            from: 'qoyyimafiassalam@gmail.com',
            to: to[i],
            subject: 'Here Are Our Weely top List!',
            // text: 'Welcome to Snap Overflow. Feel free to ask and answer questions in this small-scale Stack Overflow!'
            text: toSendContent,
        }
        transporter.sendMail(mail, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email-weekly sent: ' + info.response)
            }
        })
    }
}