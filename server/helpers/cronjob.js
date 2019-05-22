// const cron = require('node-cron')
// const Question = require('../models/question')
// const kue = require('kue')
// const queue = kue.createQueue()
// const nodemailer = require('./nodemailer')

// kue.app.listen(4000)

// module.exports = function schedule() {
//   cron.schedule('0/30 * * * * *', () => {
//     console.log('cron is starting to send emails');
//     // 00 09 * * sat
//     Question.find({})
//       .populate('userId')
//       .then(questions => {
//         questions.forEach(q => {
//           let template = `
//                         Hi, ${q.userId.email.split('@')[0]}
//                         Your question "${q.title}" has been upvoted for ${q.upVotes.length} time(s) and downvoted for ${q.downVotes.length} time(s).
//                         Your question reputation is : ${q.upVotes.length} -  ${q.downVotes.length} POINTS.
//                         Be more active in our community and gain more previlleges!
//                         Have a great weekend!

//                         - Cheers, FOXCODE Team
//                         `
//           let email = q.userId.email


//           queue
//           .create('email', {email, template})
//           .save()
//         })
//       })
//       .catch(err => {
//         console.log(err, 'error dari kue');
        
//       })


//       queue.process('email', function (job, done) {
//           nodemailer(job.data.email, job.data.template)
//           done()
//     })
//   })
// }

