let Question = require('../models/question')
function auth(req, res, next) {
    let id = req.params.id
    Question.findOne({
            _id : id
    })
    .then(function (data) {
        console.log(data) 
        if(req.payload.id == data.idUser){
            console.log('masuk author');
            
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