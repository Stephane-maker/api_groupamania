const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {

    if (req.file && req.body.post != "") {
        const postWithImage = new Post({
            ...req.body,
            post: req.body.post,
            userIdPoster: req.auth.userId,
            ImageUrl: `${req.protocol}://${req.get('host')}/image/post/${req.auth.userId}/${req.file.filename}`,
        });
        postWithImage.save()
            .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
            .catch(error => res.status(400).json({ error: "missing required fields" }));
    }
    if (!req.file && req.body.post != "") {
        const justPost = new Post({
            ...req.body,
            post: req.body.post,
            userIdPoster: req.auth.userId,
        });
        justPost.save()
            .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
            .catch(error => res.status(500).json({ error: "Internal error please try again later" }));
    }
    if (req.file && req.body.post === "") {
        if (fs.existsSync(`image/post/${req.auth.userId}`)) {
            const filename = req.file.filename;
            console.log(filename)
            fs.unlink(`image/post/${req.auth.userId}/${filename}`, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log(`image/post/${filename}` + " " + "Deleted")
            })
        }
        return res.status(400).json({ error: "missing element" })
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
            if (req.file) {
                const filename = post.ImageUrl.split("/")[6]
                console.log(fs.existsSync(`image/post/${req.auth.userId}/${filename}`))
                fs.unlink(`image/post/${req.auth.userId}/${filename}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`image/post/${req.auth.userId}/${filename}` + " " + "Deleted")
                })
                const postObject = req.file ? {
                    ...req.body,
                    ImageUrl: `${req.protocol}://${req.get('host')}/image/post/${req.auth.userId}/${req.file.filename}`
                } : {...req.body };
                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "The post has been edited" }))
                    .catch(() => res.status(500).json({ error: "you do not have permission to perform this action" }))
            }
            if (!req.file && req.body.post != "") {
                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "The post has been edited" }))
                    .catch(() => res.status(500).json({ error: "you do not have permission to perform this action" }))
            }
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (req.body.ImageUrl) {
                const filename = post.ImageUrl.split(`/image/post/${req.auth.userId}`)[1];
                fs.unlink(`image/post/${req.auth.userId}/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Object deleted" }))
                        .catch((error) => res.status(400).json({ error }))
                })
            } else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Object deleted" }))
                    .catch((error) => res.status(400).json({ error }))
            }
        })
}