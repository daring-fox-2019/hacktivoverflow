require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const routes = require('./routes/')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
var kue = require('kue')
let { CronJob } = require('cron')

mongoose.connect('mongodb://localhost/hacktivOverflow', {
    useNewUrlParser: true
}, function () {
    console.log(' Connected into database !')
})

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/', routes)

// app.use(function(){
//     new CronJob('* * * * * *', function(){
//         console.log('hehehe')
//     }, null, true, 'Asia/Jakarta' )
// })

app.use(errorHandler)

app.use("/kue-ui", kue.app)

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`)
})