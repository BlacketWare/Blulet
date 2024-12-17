import { model, Schema } from "mongoose";

export default model("Request", new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    }
}, {
    timestamps: true
}));