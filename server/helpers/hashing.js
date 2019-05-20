const bcrypt = require('bcryptjs')

module.exports = {
    generateHash: (pass) => {
        return bcrypt.hashSync(pass, 8)
    },
    compareHash: function (pass,hash){
        return bcrypt.compareSync(pass,hash)
    }
}