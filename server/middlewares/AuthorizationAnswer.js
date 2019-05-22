let Answer = require('../models/answer')
function auth(req, res, next) {
    let id = req.params.id
    Answer.findOne({
            _id : id
    })
    .then(function (data) {
        console.log(data.idUser) 
        console.log(req.payload.id);
        if(req.payload.id == data.idUser){
            console.log('sama')
            next()
        }else {
            res.status(401).json({
                msg: 'data not match'
            })
        }
        
    })
    .catch(function (err) {
        res.status(404).json(err)
        
    })  
}

module.exports = auth