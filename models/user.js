const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    confirmEmail: { trype: String, required: false },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: false },
    adminRight: { type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);