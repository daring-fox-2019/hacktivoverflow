const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pp: {
        type: String
    },
    watchTags: [{type: String}],
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return User.findOne({
                        email: val
                    })
                    .then(data => {
                        if (data) {
                            return false
                        }
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
            },
            message: props => `${props.value} has already registered`
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User