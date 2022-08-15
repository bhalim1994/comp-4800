const express = require("express");
const questionBranchesController = require("../controllers/questionBranches.controller.js");
const verifyAccessToken = require("../utils/jwtVerifier.js");

const router = express.Router();

router.get("/", questionBranchesController.getQuestionBranches);

router.use(verifyAccessToken);

router.post("/", questionBranchesController.createQuestionBranch);

router.delete("/", questionBranchesController.deleteQuestionBranch);

module.exports = router;
