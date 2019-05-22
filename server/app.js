require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000 || process.env.PORT
const routes = require('./routes')
const http = require('http').Server(app)

mongoose.connect(`mongodb://localhost/overflow`, { useNewUrlParser: true })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', routes)

http.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})