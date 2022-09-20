const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)

    .then(hash => {
        if (req.body.password != req.body.confirmPassword) {
            return res.status(400).json({ message: "Les champs mot de passe ne correspondent pas" });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash,
                adminRight: false
            });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur crée!' }))
                .catch((message) => res.status(400).json({ message: "Internal error as occured (" + message + ")" }));
        }
    })
}

exports.connexionUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "No user" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "mot de passe incorrecte" })
                    }
                    res.status(201).json({
                        message: "you are connected",
                        userId: user._id,
                        adminRight: user.adminRight,
                        token: Jwt.sign({ userId: user._id },
                            "RANDOM_TOKEN_SECRET", { expiresIn: "24h" })
                    })
                })
        })
}

exports.allUser = (req, res, next) => {
    User.find()
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(error => res.status(400).json({ error }));
}