const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hash = require('../helpers/hash')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [
            {
                validator: function(value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
                },
                msg: 'Please set valid email format'
            },
            {
                validator: function(value) {
                    return User.findOne({email: value, _id: {$ne: this._id}})
                        .then(user => {
                            if(user) {
                                return false
                            }
                        })
                        .catch(err => {
                            throw Error('Error validating email')
                        })
                },
                msg: 'Email already in use'
            },
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstname: {
        type: String,
        default: 'default_first',
    },
    lastname: {
        type: String,
        default: 'default_last',
    },
    role: {
        type: String,
        default: 'user'
    },
    image: {
        type: String,
    },
    questions: [ {type: Schema.Types.ObjectId, ref: 'Question'} ],
    tags: [ {type: Schema.Types.ObjectId, ref: 'Tag'} ],
})

userSchema.pre('save', function(next) {
    this.password = hash.hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User