const mongoose = require('mongoose')
const Schema = mongoose.Schema
const helper = require('../helpers/bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    this.password = helper.encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User