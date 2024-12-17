import { model, Schema } from "mongoose";

export default model("Room", new Schema({
    uid: {
        type: String
    },
    access: {
        type: Array
    }
}, {
    timestamps: true
}));