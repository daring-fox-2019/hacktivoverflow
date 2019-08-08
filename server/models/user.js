const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email: {
        type: String,
        validate: [
            {
                validator: function (input) {
                    let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                    return regex.test(input);
                },
                message: 'Invalid email format!'
            },
            {
                validator: function (input) {
                    return mongoose.model('User', userSchema)
                        .findOne({ _id: { $ne: this._id }, email: input })
                        .then(data => { if (data) return false })
                },
                message: 'Email is already registered!'
            }
        ]
    },
    password: 
    {
        type : String,
        minlength : [6, 'Minimum password length is 6'],
        required : [true, 'Password cannot be empty' ]
    },
    image : {type : String},
    tags : [{
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }]
})


userSchema.post('validate', function (doc) {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
})

let User = mongoose.model('User', userSchema)

module.exports = User
