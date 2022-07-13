const express = require("express");

const generalPost = require("../controller/post")

const router = express.Router();

    router.post("/createdPost", generalPost.createPost );
    router.get("/allPost" , generalPost.allPost);

module.exports = router;