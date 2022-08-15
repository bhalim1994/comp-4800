const submissionsService = require("../services/submissions.service.js");
const answerService = require("../services/answers.service.js");
const questionsService = require("../services/questions.service.js");

async function createSubmission(req, res) {
  try {
    const answers = req.body;

    const questionId = answers[0].questionId;
    const question = await questionsService.getQuestion(questionId);

    const submission = await submissionsService.createSubmission({
      surveyId: question.surveyId,
    });

    const requests = [];

    answers.forEach((answer) => {
      requests.push(
        answerService.createAnswer({
          ...answer,
          submissionId: submission.submissionId,
        })
      );
    });

    await Promise.all(requests);

    return res.status(201).json(submission);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getSubmission(req, res) {
  try {
    const { submissionId } = req.params;
    const submission = await submissionsService.getSubmission(submissionId);

    return res.status(200).json(submission);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function getSubmissions(req, res) {
  try {
    const submissions = await submissionsService.getSubmissions(req.query);

    return res.status(200).json(submissions);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function deleteSubmission(req, res) {
  try {
    const submissionId = req.params.submissionId;
    const deleted = await submissionsService.deleteSubmission(submissionId);

    if (deleted) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

module.exports = {
  createSubmission,
  getSubmission,
  getSubmissions,
  deleteSubmission,
};
