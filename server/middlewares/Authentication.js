var jwt = require('jsonwebtoken');
function isLogin(req, res, next) {
    console.log('masuk authentcation');
    
   if(req.headers.hasOwnProperty('token')){
      try {
          console.log('masuk try')
        const payload = jwt.verify(req.headers.token, process.env.SECRET)
          req.payload = payload
          next()

      }catch(err){
          res.json({
              msg : 'not authenticate'
          })
      }

    }else{
        res.json({
            msg: 'you dont have any token'

        })
    }
    
}

module.exports = isLogin