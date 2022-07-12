const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur crée!' }))
        })

    .catch((error) => res.status(400).json({ error }));
}

exports.connexionUser = (req,res,next) => {
    User.findOne({email:req.body.email})
    .then(user=> {
        if (!user) {
            return res.status(401).json({message: "No user"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({message: "mot de passe incorrecte"})
            }
            res.status(201).json({message: "you are connected"})
        })
    })
}