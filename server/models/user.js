const mongoose = require("mongoose");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");
const Schema = mongoose.Schema;


let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name:{
    type: String,
    required: true
  }
});

userSchema.path("email").validate(function(value) {
  return new Promise(function(resolve,reject){
    User.findOne({ email: value })
    .then(user => {
      if (user) {
        resolve(false)
      }else{
        resolve(true)
      }
    })
    .catch(err=>{
      reject(err)
    })

  })
}, "Email is taken!");

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = hashPass(this.password);
  }
  next();
});

let User = mongoose.model("User", userSchema);

module.exports = User;