const express = require("express");
const questionsController = require("../controllers/questions.controller.js");

const router = express.Router();

router.post("/", questionsController.createQuestion);

router.post("/:questionId", questionsController.duplicateQuestion);

router.get("/:questionId", questionsController.getQuestion);

router.get("/", questionsController.getQuestions);

router.patch("/:questionId", questionsController.updateQuestion);

router.patch("/", questionsController.updateQuestions);

router.delete("/:questionId", questionsController.deleteQuestion);

module.exports = router;
