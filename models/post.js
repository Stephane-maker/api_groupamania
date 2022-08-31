const mongoose = require("mongoose");
const { schema } = require("./user");

const schemaPost = mongoose.Schema({
    // _ID: { type: String, require: true },
    post: { type: String, required: true },
    userIdPoster: { type: String, require: true },
    ImageUrl: { type: String, require: false },
    // commentaire: {type: String},
    // userLike: [String],
    // like: { type: Number }
});

module.exports = mongoose.model("Post", schemaPost)