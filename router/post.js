const express = require("express");

const generalPost = require("../controller/post")
const TokenUser = require("../middelware/auth_user")
const multer = require("../middelware/multer")

const router = express.Router();

router.post("/createdPost", TokenUser, multer, generalPost.createPost);
router.get("/allPost", TokenUser, generalPost.allPost);
router.get("/allPost/:id", TokenUser, generalPost.OnePost);
router.post("/modifyPost/:id", TokenUser, multer, generalPost.modifyPost);
router.post("/deletePost/:id", TokenUser, generalPost.deletePost);

module.exports = router;