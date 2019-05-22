const { verify } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = {
  authenticate (req,res,next) {
    let { token } = req.headers
    if(token) {
      let decode = verify(token)
      User.findOne({email : decode.email})
      .then(user =>{
        if(user) {
          req.user = user
          next()
        }else {
          res.status(400).json({ message : 'you must login to access this endpoint'}) 
        }
      })
      .catch(err =>{
        console.log(err)
      })
    }else {
      res.status(400).json({ message : 'you must login to access this endpoint'}) 
    }
  }
}

