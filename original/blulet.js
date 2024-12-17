const fs = require("fs");
const config = require("./storage/config.json")
const startTime = Date.now();

const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
const User = require("./models/User")

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://127.0.0.1:27017/${config.lower}`, {
    useNewUrlParser: true,
    useunifiedTopology: true,
    // db.yourCollection.updateMany({}, {$set:{"someField": "someValue"}}) format for updating all documents in a collection
});

mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log(`[MongoDB]: Connected to ${config.lower} database.`);
});

const app = express();
app.use(express.static('static'));
app.use(express.json());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.use(session({
    secret: "YOURDOXISONDOXBINTHERESAPOUNDINGINYOURHEADSWATTEAMBUSTINGDOWNTHEDOOR",
    name: "bluletSession",
    store: new FileStore({
      logFn: () => {}
    }),
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: {
      maxAge: Number.MAX_SAFE_INTEGER
    }
  }));

['routers'].forEach((folder) => {
    fs.readdirSync(`./${folder}`).forEach((file) => {
        require(`./${folder}/${file}`)(app);
    });
    console.log(`[Express]: Loaded ${folder}.`);
});

app.get('*', (req, res) => res.sendFile("404.html", {
    root: "./views/"
}));

let io = require('socket.io')(app.listen(80, () => console.log(`[Express]: Listening on port 80.`)));

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
});

require('./sockets/main.js')(io);