const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/hacktivoverflow',{ useNewUrlParser: true } );

let userSchema = new Schema({
    firstName : String,
    lastName: String,
    email : String,
    password: String,
    questionList : [{type: Schema.Types.ObjectId, ref : 'question'}],
    answerList : [{type: Schema.Types.ObjectId, ref : 'answer'}]
})

userSchema.pre('save',function(next){
    let user = this
    let salt = bcrypt.genSaltSync(8)
    let hash = bcrypt.hashSync(user.password,salt)
    user.password = hash
    next()
})

let User = mongoose.model('user',userSchema)

module.exports = User