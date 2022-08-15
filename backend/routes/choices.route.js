const express = require("express");
const choicesController = require("../controllers/choices.controller.js");

const router = express.Router();

router.post("/", choicesController.createChoice);

router.get("/:choiceId", choicesController.getChoice);

router.get("/", choicesController.getChoices);

router.patch("/:choiceId", choicesController.updateChoice);

router.patch("/", choicesController.updateChoices);

router.delete("/:choiceId", choicesController.deleteChoice);

module.exports = router;
