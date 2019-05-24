const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {

    generateHashPass(pass){
        return bcrypt.hashSync( pass, +process.env.SALT )
    },
    generateJWT(obj){
        return jwt.sign({ email : obj.email, id: obj.id, name: obj.name, role: obj.role }, process.env.JWT_KEY, { expiresIn : 12 * 3600 })
    },
    compareHash(pass, passDB){
        return bcrypt.compareSync( pass, passDB )
    }
}
