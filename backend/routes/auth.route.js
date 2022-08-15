const express = require("express");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/login", authController.login);

router.post("/forgotPassword", authController.resetPassword);

module.exports = router;
