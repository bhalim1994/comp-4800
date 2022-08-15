const express = require("express");
const submissionsController = require("../controllers/submissions.controller.js");
const verifyAccessToken = require("../utils/jwtVerifier.js");

const router = express.Router();

router.post("/", submissionsController.createSubmission);

router.use(verifyAccessToken);

router.get("/:submissionId", submissionsController.getSubmission);

router.get("/", submissionsController.getSubmissions);

router.delete("/:submissionId", submissionsController.deleteSubmission);

module.exports = router;