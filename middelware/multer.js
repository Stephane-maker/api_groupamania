const multer = require("multer");
const auth = require("./auth_user");
const fs = require("fs")

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"

}
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("image/post/" + req.auth.userId)) {
            fs.mkdirSync("image/post/" + req.auth.userId);
        }
        callback(null, "image/post/" + req.auth.userId)
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

module.exports = multer({ storage }).single("image");