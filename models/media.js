const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema ({
    url: {
        type: String,
        required: true
    },
    like: [{type: Schema.Types.ObjectId, ref: "User"}],
    title: {
        type: String
    },
    description: {
        type: String
    },
    comment: [{
        type: String
    }],
    type: String
})

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media