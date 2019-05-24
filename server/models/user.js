const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;
const Helper = require('../helpers/helper')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        User.findOne({
                                email
                            })
                            .then(data => {
                                if (data === null) {
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    });
                },
                message: props => `${props.value} sudah terdaftar`
            },
            {
                validator: function(email) {
                    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/;
                    return emailRegex.test(email)
                }
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password min length is 4'],
    }
});

userSchema.pre('save', function(next, done) {
    this.password = Helper.hashPassword(this.password)
    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User