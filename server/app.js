var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const mongoose = require('mongoose')


mongoose.set('useNewUrlParser', true)

mongoose.connect(process.env.MONGOLINK,{useNewUrlParser: true})
// mongodb+srv://<username>:<password>@cluster0-jpvto.gcp.mongodb.net/test?retryWrites=true
require('dotenv').config()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extends:true}))

app.use('/',routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))