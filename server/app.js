const express = require('express')
const app = express()
const port = process.env.port || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const errHandling = require('./middlewares/errHandling')
const userRoute = require('./routes/userRoute')
const questionRoute = require('./routes/questionRoute')
const answerRoute = require('./routes/answerRouter')

dotenv.config()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRoute)
app.use('/questions', questionRoute)
app.use('/answers', answerRoute)
app.use(errHandling)

mongoose.connect(`mongodb://localhost/hactivoverflow`, { useNewUrlParser: true }, (err) => {
    if (err) console.log('Database not connect!')
    else console.log(`Database connected`)
})
app.listen(port, () => {
    console.log(`server running at port`)
})