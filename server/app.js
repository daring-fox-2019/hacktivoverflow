require('dotenv').config()
var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const mongoose = require('mongoose')
const connectingMonggoDb = process.env.connectingMonggoDb || 'mongodb://localhost/hacktivoverflow'


mongoose.set('useNewUrlParser', true)
mongoose.connect(connectingMonggoDb,{useNewUrlParser: true})
.then(() => {
  console.log("Connected to database!");
  })
  .catch((error) => {
  console.log(`bermasalah`);
  console.log("Connection failed!");
  console.log(error);
  })

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extends:true}))

app.use('/',routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))