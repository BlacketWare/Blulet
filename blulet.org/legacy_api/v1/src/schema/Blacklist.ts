import { model, Schema } from "mongoose";

export default model("Blacklist", new Schema({
    ip: {
        type: String
    },
    reason: {
        type: String
    }
}, {
    timestamps: true
}));