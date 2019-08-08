const axios = require('axios')

class ApiController {

  static async githubJobs(req,res) {
    try {
      let search = req.body.jobInput
      console.log(search, 'HAHAHAHAHHAA?');
      
        let {data} = await axios.get(`https://jobs.github.com/positions.json?description=${search}&page=1`) 
        const shuffled = data.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 4);
        
        res.status(200).json(selected)
    } catch (error) {
      console.log(error);
      
      res.status(500).json(error)
    }
  }
}

module.exports = ApiController