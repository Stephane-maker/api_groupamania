const express = require("express");

const mongoose = require("mongoose");
const connexionUser = require("./router/user");
const generalPost = require("./router/post");
const path = require("path")

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://admin:WaTW7M49WJZk9Nzm@cluster0.v51i2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use("/image", express.static(path.join(__dirname, "image")));
app.use("/api/auth", connexionUser);
app.use("/api/", generalPost)

module.exports = app;