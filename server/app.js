require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const port = process.env.PORT
const route = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:admin@cluster0-qtp0t.gcp.mongodb.net/test?retryWrites=true',{ useNewUrlParser : true })

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(route)
app.listen(port,() => {
  console.log(`listening on port: ${port}!`)
})