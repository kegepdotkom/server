const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema ({
    url: {
        type: String,
        required: true
    },
    like: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    comment: [{
        type: String
    }]
})

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media