const express = require("express");

const generalPost = require("../controller/post")
const TokenUser = require("../middelware/auth_user")
const multer = require("../middelware/multer")

const router = express.Router();

router.post("/createdPost", TokenUser, multer, generalPost.createPost);
router.get("/allPost", TokenUser, generalPost.allPost);
router.get("/allPost/:id", TokenUser, generalPost.OnePost);
router.get("/userPost", TokenUser, generalPost.userPost)
router.put("/modifyPost/:id", TokenUser, multer, generalPost.modifyPost);
router.delete("/deletePost/:id", TokenUser, generalPost.deletePost);
router.put("/like/:id", TokenUser, generalPost.LikePost)

module.exports = router;