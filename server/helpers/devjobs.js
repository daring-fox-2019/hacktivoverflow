const express = require('express')
const cron = require('node-cron')
const nodemailer = require('./nodemailer')
const ApiController = require('../controllers/ApiController')
const app = express()

module.exports = function getJobs() {
  cron.schedule('*/30 * * * *',  async () => {
    try {
      let search = req.body.jobInput
      console.log(search, 'HAHAHAHAHHAA?');
      
        let {data} = await axios.get(`https://jobs.github.com/positions.json?description=javascript&page=1`) 
        const shuffled = data.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 4);
        
        io.emit('jobs', selected)
    } catch (error) {
      console.log(error);
    }
  })
}


