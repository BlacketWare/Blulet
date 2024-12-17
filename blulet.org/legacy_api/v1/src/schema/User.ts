import { model, Schema } from "mongoose";

export default model("User", new Schema({
    username: {
        type: String,
    // make it so it is case insensitive
    
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    banner: {
        type: String
    },
    discord: {
        type: String
    },
    badges: {
        type: Array
    },
    blues: {
        type: Object,
        default: {}
    },
    tokens: {
        type: Number
    },
    perms: {
        type: Array
    },
    role: {
        type: String
    },
    color: {
        type: String
    },
    exp: {
        type: Number
    },
    inventory: {
        type: Array
    },
    stats: {
        type: Object
    },
    friends: {
        type: Array
    },
    blocks: {
        type: Array
    },
    ip: {
        type: String
    },
    claimed: {
        type: Number
    },
    settings: {
        type: Object
    },
    otp: {
        type: Object
    },
    mute: {
        type: Object,
        default: { muted: false, reason: null, until: null, staff: null }
    },
    ban: {
        type: Object,
        default: { banned: false, reason: null, until: null, staff: null }
    },
}, {
    timestamps: true
}));