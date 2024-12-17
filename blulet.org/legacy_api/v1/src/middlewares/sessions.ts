await import("dotenv/config");
import Session from "express-session";
import connectMongodb from "connect-mongodb-session";

const MongoStore = connectMongodb(Session);
declare module "express-session" {
    interface SessionData {
        userId: string;
    }
};

export default Session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "",
    store: new MongoStore({ uri: process.env.MONGO_URI || "", collection: "sessions" }),
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 604800000, httpOnly: true },
});