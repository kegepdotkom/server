const jwt = require('jsonwebtoken')

module.exports = {
    token: (data) => {
        let token = jwt.sign({
            email: data.email
        }, process.env.SECRET)
        return token
    }
}