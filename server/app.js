require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const routes = require('./routes/')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
var kue = require('kue')
const cron = require('./helpers/cronJob')
let { CronJob } = require('cron')

mongoose.connect(process.env.MONGO_DB, {
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

app.use(errorHandler)

app.use("/kue-ui", kue.app)

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`)
    new CronJob('0 0 9 1 * *', function(){
                cron()
            }, null, true, 'Asia/Jakarta' )
})