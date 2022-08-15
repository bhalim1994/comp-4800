const express = require("express");
const answersController = require("../controllers/answers.controller.js");

const router = express.Router();

router.post("/", answersController.createAnswer);

// router.get("/:answerId", answersController.getAnswer);

router.get("/submission/:submissionId", answersController.getAnswersBySubmission);

router.get("/question/:questionId", answersController.getAnswersByQuestion);

// router.patch("/:answerId", answersController.updateAnswer);

// router.patch("/", answersController.updateAnswers);

// router.delete("/:answerId", answersController.deleteAnswer);

module.exports = router;
