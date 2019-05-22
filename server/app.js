require('dotenv').config()
const express = require('express')
const app = express()

const cron = require('node-cron')
const mongoose = require("mongoose")
const cors = require('cors')
const jwt = require ('jsonwebtoken')
const routes= require('./routes')
const axios = require('axios')
const port = process.env.PORT || 3100
const http = require('http').Server(app)
const io = require('socket.io')(http)
const schedule = require('./helpers/cronjob')

// let url = process.env.MONGO_DB_ATLAS
let url = process.env.MONGO_DB_URL


io.on('connection', (socket)=> {
    console.log('new connection!')
})

const getJob = cron.schedule('1 * * * * *',  async () => {
      try {
          console.log('triggered~');
                
          let {data} = await axios.get(`https://jobs.github.com/positions.json?description=developer&page=1`) 
          const shuffled = data.sort(() => 0.5 - Math.random());
          let selected = shuffled.slice(0, 4);
          
          io.emit('jobs', selected)
      } catch (error) {
        console.log(error);
    }
})
getJob.start()

const getNews = cron.schedule('*/30 * * * * *',  async () => {
    try {
        console.log('triggered for news~');
              
        let {data} = await axios.get(`https://newsapi.org/v2/everything?q=technology&from=2019-05-21&to=2017-05-21&sortBy=popularity&apiKey=20915dfc0dfa4ec59b99db9d4bd4010f`) 
        const shuffled = data.articles.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 4);
        
        io.emit('news', selected)
    } catch (error) {
      console.log(error);
  }
})
getNews.start()



mongoose.connect(`${url}`, {useNewUrlParser : true, useCreateIndex : true})
.then(() =>{
    console.log(`======> Mongo DB Connected <=====`);
})
.catch(err => {
    console.log(err);
})

// schedule()

app
    .use(express.json())
    .use(express.urlencoded({extended : true}))
    .use(cors())

app.use('/', routes)
http.listen(port, () => {
    console.log('listening on', port)
})