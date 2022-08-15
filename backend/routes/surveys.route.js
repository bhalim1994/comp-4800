const express = require("express");
const surveysController = require("../controllers/surveys.controller.js");
const verifyAccessToken = require("../utils/jwtVerifier.js");

const router = express.Router();

router.get("/:surveyId", surveysController.getSurvey);

router.use(verifyAccessToken);

router.post("/", surveysController.createSurvey);

router.post("/:surveyId", surveysController.duplicateSurvey);

router.get("/", surveysController.getSurveys);

router.patch("/:surveyId", surveysController.updateSurvey);

router.delete("/:surveyId", surveysController.deleteSurvey);

module.exports = router;
