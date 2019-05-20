var mongooseErrorFromClient = ["CastError","ValidatorError","ValidationError"]

module.exports = function(err,req,res,next){
        if(mongooseErrorFromClient.includes(err.name)){
            console.log(err.name)
            res.status(400).json(err)
        } else {
            console.log(err)
            res.status(500).json(err)
        }
}