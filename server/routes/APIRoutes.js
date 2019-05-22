const router = require('express').Router()
const axios = require('axios')

router.get('/news', (req, res) => {
    axios
        .get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEWS_API}`)
        .then(({ data })=> {
          
            res.status(200).json(data)
        })
        .catch((err)=> {
            res.status(500).json(err)
        })
})

router.get('/jobs', (req, res)=> {
    axios
        .get(`https://jobs.github.com/positions.json?description=developer`)
        .then(({ data })=> {
           
            res.status(200).json(data)
        })
        .catch((err)=> {
            res.status(500).json(err)
        })

})

module.exports = router