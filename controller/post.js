const Post = require("../models/post");
const fs = require("fs");
exports.createPost = (req, res, next) => {
    console.log(req.body)
    if (req.file) {
        const postWithImage = new Post({
            ...req.body,
            post: req.body.post,
            userIdPoster: req.auth.userId,
            ImageUrl: `${req.protocol}://${req.get('host')}/image/post/${req.auth.userId}/${req.file.filename}`,
        });
        postWithImage.save()
            .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
            .catch(error => res.status(400).json({ error: "missing required fields" }));
    } else {
        const justPost = new Post({
            ...req.body,
            post: req.body.post,
            userIdPoster: req.auth.userId,
        });
        justPost.save()
            .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
            .catch(error => res.status(500).json({ error: "Internal error please try again later" }));
    }
};

exports.OnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch(error => res.status(500).json({ error: "Internal Server Error" }));
}

exports.allPost = (req, res, next) => {
    Post.find()
        .then(post => {
            return res.status(200).json(post);
        })
        .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            const postObject = req.file ? {
                ...req.body
            } : {...req.body };

            Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                .then(() => res.status(201).json({ message: "The post has been edited" }))
                .catch(() => res.status(500).json({ error: "you do not have permission to perform this action" }))
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.ImageUrl) {
                if (fs.existsSync("image/post/" + req.auth.userId)) {
                    const filename = post.ImageUrl.split("/image/post/")[1];
                    fs.unlink(`image/post/${filename}`, () => {
                        Post.deleteOne({ id: req.params.id })
                            .then(res.status(201).json({ message: "the post has been deleted" }))
                            .catch((error) => res.status(500).json({ error: "you do not have permission to perform this action" }))
                    })
                }
            } else {
                Post.deleteOne({ id: req.params.id })
                    .then(res.status(201).json({ message: "the post has been deleted" }))
                    .catch((error) => res.status(500).json({ error: "you do not have permission to perform this action" }))
            }
        })
}