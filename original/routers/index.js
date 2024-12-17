const express = require('express')
const router = express.Router()
const User = require("../models/User")
let directory = "/Users/alvar/Downloads/blulet_2/blulet"

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile("index.html", {
            root: directory + "/views/"
        });
    });
    app.get('/credits', (req, res) => {
        res.sendFile("credits.html", {
            root: directory + "/views/"
        });
    });

    app.get('/auction', (req, res) => {
        res.sendFile("auction.html", {
            root: directory + "/views/"
        });
    });

    app.get('/market', (req, res) => {
        res.sendFile("market.html", {
            root: directory + "/views/"
        });
    });

    app.get('/chat', (req, res) => {
        res.sendFile("chat.html", {
            root: directory + "/views/"
        });
    });

    app.get('/settings', (req, res) => {
        res.sendFile("settings.html", {
            root: directory + "/views/"
        });
    });

    app.get('/logout', (req, res) => {
        res.sendFile("logout.html", {
            root: directory + "/views/"
        });
    });
    app.get('/stats', (req, res) => {
        res.sendFile("stats.html", {
            root: directory + "/views/"
        });
    });

    app.get('/register', (req, res) => {
        res.sendFile("register.html", {
            root: directory + "/views/"
        });
    });

    app.get('/blues', (req, res) => {
        res.sendFile("blues.html", {
            root: directory + "/views/"
        });
    });
    app.get('/staff', (req, res) => {
        res.sendFile("staff.html", {
            root: directory + "/views/"
        });
    });
    app.get('/getkey', (req, res) => {
        res.sendFile("getkey.html", {
            root: directory + "/views/"
        });
    });

    app.get('/posts', (req, res) => {
        res.sendFile("posts.html", {
            root: directory + "/views/"
        });
    });

    app.get('/login', (req, res) => {
        res.sendFile("login.html", {
            root: directory + "/views/"
        });
    });

    app.get('/posts/create', (req, res) => {
        res.sendFile("create.html", {
            root: directory + "/views/"
        });
    });

    app.get('/staff/users', (req, res) => {
        res.sendFile("users.html", {
            root: directory + "/views/"
        });
    });

    app.get('/config.json', (req, res) => {
        res.sendFile("config.json", {
            root: directory + "/storage/"
        });
    });
}