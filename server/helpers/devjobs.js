const express = require('express')
const cron = require('node-cron')
const axios = require('axios')
const nodemailer = require('./nodemailer')
const ApiController = require('../controllers/ApiController')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

module.exports = cron.schedule('1 * * * * *',  async () => {
  try {
      console.log('triggered~');
            
      let {data} = await axios.get(`https://jobs.github.com/positions.json?description=javascript&page=1`) 
      const shuffled = data.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 4);
      
      io.emit('jobs', selected)
  } catch (error) {
    console.log(error);
}
})

