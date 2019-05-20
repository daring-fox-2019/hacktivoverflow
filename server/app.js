require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes')
const port = process.env.PORT || 3000

let app = express()

mongoose.connect('mongodb://localhost/newHacktivOverflow', { useNewUrlParser: true })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', route)

app.listen(port, () => {
  console.log(`Listen on ${port}`);
})
