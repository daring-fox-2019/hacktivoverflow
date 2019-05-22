require('dotenv').config()

const express = require('express')
const app = express()

const port = 3000

const route = require('./routes/routes')

const cors = require('cors')

const DB = process.env.MONGODB_CONNECTION_URL || 'mongodb://localhost/hacktivoverflow'
const mongoose = require('mongoose')
mongoose.connect(DB + process.env.NODE_ENV, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

// var CronJob = require('cron').CronJob;
// new CronJob('*/5 * * * * *', function () {
//       console.log('lala');
// }, null, true, 'America/Los_Angeles');



app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', route)

app.listen(port, () => {
    console.log(`You are listening to ${port} FM`)
    console.log(`~~~Suara musik terkini~~~`);
})