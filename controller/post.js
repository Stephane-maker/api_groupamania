const Post = require("../models/post");
const fs = require("fs");
const { updateOne, updateMany } = require("../models/post");

exports.createPost = (req, res, next) => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    if (req.file && req.body.post != "") {

        const postWithImage = new Post({
            ...req.body,
            post: req.body.post,
            userIdPoster: req.auth.userId,
            date: date + "-" + month + "-" + year + " " + hours + ":" + minutes,
            ImageUrl: `${req.protocol}://${req.get('host')}/image/post/${req.auth.userId}/${req.file.filename}`,
            like: [],
            nbrLike: 0
        });
        postWithImage.save()
            .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
            .catch(error => res.status(400).json({ error: "missing required fields" }));
    }
    if (!req.file && req.body.post != "") {
        const justPost = new Post({
            ...req.body,
            post: req.body.post,
            date: date + "-" + month + "-" + year + " " + hours + ":" + minutes,
            userIdPoster: req.auth.userId,
            like: [],
            nbrLike: 0
        });
        justPost.save()
            .then(() => res.status(201).json({ message: 'Post has been successfully created' }))
            .catch(error => res.status(500).json({ error: "Internal error please try again later" }));
    }
    if (req.file && req.body.post === "") {
        if (fs.existsSync(`image/post/${req.auth.userId}`)) {
            const filename = req.file.filename;
            fs.unlink(`image/post/${req.auth.userId}/${filename}`, (err) => {
                if (err) {
                    console.log(err)
                }
                return true
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
        .then((post) => {

            if (post.length === 0) {
                const array = [{ message: "Aucun post pour le moment " }]
                return res.status(200).json(array);
            }

            return res.status(200).json(post.reverse());

        })
        .catch(error => res.status(400).json({ error }));
}

exports.userPost = (req, res, next) => {
    Post.find({ userIdPoster: req.auth.userId })
        .then((post) => {
            if (post.length === 0) {
                const array = [{ message: "Aucun post pour le moment " }]
                return res.status(200).json(array);
            }
            return res.status(201).json(post.reverse())
        })
        .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            console.log(req.body)
            if (req.file && post.ImageUrl) {
                const filename = post.ImageUrl.split("/")[6]
                console.log(fs.existsSync(`image/post/${req.auth.userId}/${filename}`))
                fs.unlink(`image/post/${req.auth.userId}/${filename}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return true
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
                Post.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "The post has been edited" }))
                    .catch(() => res.status(500).json({ error: "you do not have permission to perform this action" }))
            }
            if (req.file && !post.ImageUrl) {
                const postObject = req.file ? {
                    ...req.body,
                    ImageUrl: `${req.protocol}://${req.get('host')}/image/post/${req.auth.userId}/${req.file.filename}`
                } : {...req.body };
                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "The post has been edited" }))
                    .catch(() => res.status(500).json({ error: "you do not have permission to perform this action" }))
            }
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.ImageUrl) {
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

exports.LikePost = (req, res, next) => {

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post.like.includes(req.auth.userId)) {
                Post.updateMany({ _id: req.params.id }, { $push: { like: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "Object Liked" }))
                    .catch((error) => res.status(400).json({ message: " Internal Error" }))
            } else {
                Post.updateMany({ _id: req.params.id }, { $pull: { like: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "Object UnLiked" }))
                    .catch((error) => res.status(400).json({ message: " Internal Error" }))
            }
        })
        .catch((err) => res.status(501).json({ message: " Internal Error" }))

}