const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    ip: {
        type: String
    },
    tokens: {
        type: Number
    },
    blues: {
        type: [{
            "blue": String,
            "quantity": Number
        }]
    },
    pfp: {
        type: String
    },
    lowercase: {
        type: String
    },
    banned: {
        type: Boolean
    },
    reason: {
        type: String
    },
    banby: {
        type: String
    },
    muted: {
        type: Boolean
    },
    muteby: {
        type: String
    },
    opened: {
        type: Number
    },
    role: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User