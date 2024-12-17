import { model, Schema } from "mongoose";

export default model("Blue", new Schema({
    name: {
        type: String
    },
    rarity: {
        type: String
    },
    price: {
        type: Number
    },
    chance: {
        type: Number
    },
    image: {
        type: String
    },
    background: {
        type: String
    }
}, {
    timestamps: true
}));