const express = require("express");

const generalPost = require("../controller/post")

const router = express.Router();

router.post("/createdPost", generalPost.createPost);
router.get("/allPost", generalPost.allPost);
router.get("/allPost/:id", generalPost.OnePost);
router.post("/:id/modifyPost", generalPost.modifyPost);
router.post("/:id/deletePost", generalPost.deletePost);

module.exports = router;