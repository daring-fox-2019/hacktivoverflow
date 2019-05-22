const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true
})
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "email cannot be empty"],
        validate: {
            validator: (v) => {
                let isUsed = async function checkEmail(v) {
                    let check = await User.findOne({
                        email: v
                    })
                    console.log(check);
                    if (check) return false
                    else return true
                }
                return isUsed(v)
            },
            message: "email already registered"
        }
    },
    password: String,
    image: String,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }]
})

userSchema.pre('save', function (next) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User