const mongoose = require("mongoose");
const { schema } = require("./user");

const schemaPost = mongoose.Schema({
    post: { type: String, required: true },
    userIdPoster: { type: String, require: true },
    ImageUrl: { type: String, require: false },
    date: { type: String, require: true },
    like: [{ type: String, required: true }],
    nbrLike: { type: Number, required: true }
});

module.exports = mongoose.model("Post", schemaPost)