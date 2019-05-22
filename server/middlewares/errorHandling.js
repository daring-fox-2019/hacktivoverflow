module.exports = function(err, req, res, next){
    switch(err.message){
        case 'Unauthenticate' : 
        case 'Unauthorize' : 
        case 'Not Found' : 
        case `User already registered` : 
        case `incorrect username/password` :
        case `user not yet registered` : 
            res.status(400).json(err)
            break
        case `JsonWebTokenError: jwt must be provided` : {
            res.status(400).json({ message : err.message})
            break
        }
        default : {
            res.status(500).json({ message : err.message})
        }
    }
}


