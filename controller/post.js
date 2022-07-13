
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

exports.allPost = (req, res, next) => {
    Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json({error: "Internal Server Error"}));
}

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
    .then((post) =>{
        const postObject = req.file?{
            ...req.body
        }:{...req.body};

        Post.updateOne({ _id: req.params.id},{...req.body, _id: req.params.id})
        .then(() => res.status(201).json({message: "The post has been edited"}))
        .catch(() => res.status(500).json({error: "you do not have permission to perform this action"}))
    })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
    .then((sauce) => {
        Post.deleteOne({ id: req.params.id})
        .then(res.status(201).json({ message: "the post has been deleted" }))
        .catch((error) => res.status(500).json({error : "you do not have permission to perform this action"}))
    })
}