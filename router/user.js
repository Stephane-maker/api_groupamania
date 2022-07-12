const express = require("express");

const controllerUser = require("../controller/user")

const router = express.Router();

router.post("/signup", controllerUser.createUser );
router.post("/login", controllerUser.connexionUser );

module.exports = router;