const express = require("express");
const passwordResetsController = require("../controllers/passwordResets.controller.js");

const router = express.Router();

router.get("/:passwordResetId", passwordResetsController.getPasswordReset);

router.post("/:passwordResetId", passwordResetsController.resetPassword);

module.exports = router;
