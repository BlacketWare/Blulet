import { model, Schema } from "mongoose";

export default model("Rarities", new Schema({
    name: {
        type: String
    },
    color: {
        type: String
    },
    animation: {
        type: String
    },
    exp: {
        type: Number
    },
    waitTime: {
        type: Number
    }
}, {
    timestamps: true
}));