
const { find } = require("../models/post");
const Post = require("../models/post");

exports.createPost = (req, res, next) => {
    const post = new Post({
        ...req.body
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
        .catch(error => res.status(400).json({ error : "missing required fields"}));
};

exports.allPost = (req, res, next) =>{
    Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json({error: "Internal Server Error"}));
}