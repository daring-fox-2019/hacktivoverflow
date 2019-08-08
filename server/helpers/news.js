const express = require('express')
const axios = require('axios')
const cron = require('node-cron')
const nodemailer = require('./nodemailer')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

module.exports = cron.schedule('*/30 * * * * *',  async () => {
  try {
      console.log('triggered for news~');
            
      let {data} = await axios.get(`https://newsapi.org/v2/everything?q=technology&from=2019-05-21&to=2017-05-21&sortBy=popularity&apiKey=20915dfc0dfa4ec59b99db9d4bd4010f`) 
      const shuffled = data.articles.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 4);
      console.log(data, 'dari server');
      
      io.emit('news', selected)
  } catch (error) {
    console.log(error);
}
})

