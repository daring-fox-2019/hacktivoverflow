const userModel = require('../models/user')
const Helper = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

const {transporter, mailOptions} = require('../helpers/nodemailer')

const kue = require('kue');
const queue = kue.createQueue();

queue.process('send_email', (job, done) => {
    mailOptions.to = job.data.to

    transporter.sendMail(mailOptions, function(error, info){
        if(error)
            { return console.log( error ); }
        else
            { done() }      
     }); 
});

class User {
    static create( req, res, next ){
        const { name, email, password } = req.body
        const tags = []

        queue.create('send_email', { to:email }).priority('high').attempts(5).save();

        userModel.create( { name, email, password, tags})
        .then( data => {
            res.status(201).json( data )
        })
        .catch( err => {
            next( err )
        })
    }

    static getOneUser(req, res, next){
        const _id = req.params.id

        userModel.findOne({ _id })
        .select(['name', 'tags'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next( err )
        })
    }

    static updateUser(req, res, next){
        const { name, tag, removetag } = req.body
        const _id = req.decoded.id
        let obj = {}

        if(tag){
            obj = { $addToSet : { tags : tag }}
        }

        if(name){
            obj.name = name
        }

        if(removetag){
            obj = {$pull : {tags : removetag}}
        }

        userModel.findOneAndUpdate({ _id }, obj, {new : true})
        .select(['name', 'tags'])
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next( err )
        })
    }

    static postLogin(req, res, next){
        const { email, password } = req.body

        userModel.findOne({ email })
        .then(data => {
            if(data){
                if(Helper.compareHash(password, data.password)){
                    let token = Helper.generateJWT({ 
                        name : data.name, 
                        id : data._id, 
                        email : data.email,
                    })
                    res.status(200).json({ token, email : data.email, id:data._id, name:data.name })
                } else {
                    next({ message : `incorrect username/password`})
                }
            } else {
                next({ message : `user not yet registered`})
            }
        })
        .catch( err => {
            next( err )
        })
    }

    static googleSignIn(req, res, next){

        let payload

        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID_GOOGLE
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return userModel.findOne({ email : payload.email})
        })
        .then( user => {
            if(user){
                let token =  Helper.generateJWT({ email: user.email, id:user._id})
                res.status(200).json({
                    token, 
                    name: user.name, 
                    id: user._id,
                })
            } else {
                queue.create('send_email', { to:email }).priority('high').attempts(5).save();
                return userModel.create({ 
                    email: payload.email, 
                    password: process.env.PASSWORD, 
                    name: payload.name,
                })
            }
        })
        .then( userData => {
            let token =  Helper.generateJWT({ 
                name : userData.name, 
                email: userData.email, 
                id: userData._id,
            })
            res.status(200).json({token , name:userData.name, id:userData._id})
        })
        .catch( err =>{
            next(err)
        })
    }
}

module.exports = User