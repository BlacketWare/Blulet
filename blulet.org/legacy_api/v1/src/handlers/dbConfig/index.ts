import { connect } from "mongoose";

export default async () => await connect(process.env.MONGO_URI || "").then(() => console.log("[Blulet] MongoDB connection established"));