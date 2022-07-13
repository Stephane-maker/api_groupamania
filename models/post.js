const mongoose = require("mongoose");
const { schema } = require("./user");

const schemaPost = mongoose.Schema({
    post: { type: String, required: true },
    // commentaire: {type: String},
    // userLike: [String],
    // like: {type: Number}
});

module.exports = mongoose.model("Post", schemaPost)