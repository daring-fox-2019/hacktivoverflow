const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require('../helpers/bcrypt')

let validEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

let uniqueEmail = function (email) {
    return User.findOne({ email: email })
        .then(user => {
            if (user) return false
            else return true
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please input your username"]
    },
    email: {
        type: String,
        required: [true, "Please input your email address"],
        validate: [
            { validator: validEmail, msg: 'Please use a valid email address' },
            { validator: uniqueEmail, msg: "Email address is already taken" }
        ]
    },
    password: {
        type: String,
        required: [true, "Please input your password"]
    }
})

userSchema.pre('save', function (next) {
    this.password = bcryptjs.hashSync(this.password)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User