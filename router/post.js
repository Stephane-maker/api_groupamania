const express = require("express");

const generalPost = require("../controller/post")
const TokenUser = require("../middelware/auth_user")
const addImage = require("../middelware/multer")

const router = express.Router();

router.post("/createdPost", addImage, generalPost.createPost);
router.get("/allPost", TokenUser, generalPost.allPost);
router.get("/allPost/:id", TokenUser, generalPost.OnePost);
router.post("/:id/modifyPost", TokenUser, generalPost.modifyPost);
router.post("/:id/deletePost", TokenUser, generalPost.deletePost);

module.exports = router;