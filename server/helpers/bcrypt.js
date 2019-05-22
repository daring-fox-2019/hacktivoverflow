const bcrypt = require('bcryptjs')

module.exports = {
    hashSync: (password) => {
        return bcrypt.hashSync(password, 8)
    },
    compareSync: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }
}