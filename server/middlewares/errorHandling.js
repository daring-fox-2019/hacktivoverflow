module.exports = function(err,req,res,next){
  switch (err.message) {
    case "Invalid email/password":
      res.status(400).json({
        msg: "Invalid email/password"
      })
      break;
  
    default:
      break;
  }
}