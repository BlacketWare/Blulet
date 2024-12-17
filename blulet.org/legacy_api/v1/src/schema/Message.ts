import { model, Schema } from "mongoose";

export default model("Message", new Schema({
    content: {
        type: String
    },
    author: {
        type: String
    },
    room: {
        type: String
    },
    mentions: {
        type: Array
    },
    edits: {
        type: Array
    },
    deleted: {
        type: Boolean
    }
}, {
    timestamps: true
}));