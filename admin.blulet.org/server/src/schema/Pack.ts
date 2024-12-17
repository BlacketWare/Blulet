import { model, Schema } from "mongoose";

export default model("Pack", new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    colors: {
        type: Array
    },
    blues: {
        type: Array
    },
    image: {
        type: String
    }
}, {
    timestamps: true
}));