const submissionsService = require("../services/submissions.service");
const excelExporter = require("../utils/excelExporter");
const fs = require("fs");

async function exportToExcel(req, res) {
  try {
    const { startDateFilter, endDateFilter } = req.body;
    const { surveyId } = req.params;
    if (startDateFilter && endDateFilter) {
      startDate = new Date(startDateFilter);
      endDate = new Date(endDateFilter);

      const submissions = await submissionsService.getSubmissions({
        surveyId: surveyId,
      });
      const fileName = "excel-from-js.xlsx";
      const filePath = `./outputFiles/${fileName}`;
      var filteredSubmissions = [];
      var allAnswers = [];

      filteredSubmissions = submissions.filter(
        (submission) =>
          submission.createdAt >= startDate && submission.createdAt <= endDate
      );
      filteredSubmissions.forEach(function (s) {
        allAnswers.push(s.answers);
      });
      excelExporter.exportOfficeChart(allAnswers).then(() => {
        res.download(filePath, fileName, (err) => {
          if (err) console.log(err);
          fs.unlinkSync(filePath);
        });
      });
    } else {
      const submissions = await submissionsService.getSubmissions({
        surveyId: surveyId,
      });
      const fileName = "excel-from-js.xlsx";
      const filePath = `./outputFiles/${fileName}`;
      var allAnswers = [];
      submissions.forEach(function (s) {
        allAnswers.push(s.answers);
      });

      excelExporter.exportOfficeChart(allAnswers).then(() => {
        res.download(filePath, fileName, (err) => {
          if (err) console.log(err);
          fs.unlinkSync(filePath);
        });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

module.exports = {
  exportToExcel,
};
