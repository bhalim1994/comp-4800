const express = require("express");
const reportsController = require("../controllers/reports.controller.js");

const router = express.Router();

router.post("/:surveyId", reportsController.exportToExcel);

module.exports = router;
