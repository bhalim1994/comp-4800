const { Submission, Answer } = require("../models/index");

async function createSubmission(submission) {
  const { surveyId } = submission;
  const createdSubmission = await Submission.create({ surveyId });

  return createdSubmission;
}

async function getSubmission(submissionId) {
  const options = {};

  options.include = [
    {
      model: Answer,
      as: "answers",
    },
  ];

  const submission = await Submission.findByPk(submissionId, options);
  return submission;
}

async function getSubmissions(params) {
  const options = getAllWhereOptions(params);

  options.include = [
    {
      model: Answer,
      as: "answers",
    },
  ];

  options.order = [["createdAt", "DESC"]];

  const submissions = await Submission.findAll(options);
  return submissions;
}

async function deleteSubmission(submissionId) {
  const submission = await Submission.findOne({ where: { submissionId } });

  if (submission === null) {
    return false;
  } else {
    await submission.destroy();
    return true;
  }
}

function getAllWhereOptions(params) {
  const { email, surveyId } = params;
  const options = {
    where: {},
  };

  if (email !== undefined) options.where.email = email;
  if (surveyId !== undefined) options.where.surveyId = surveyId;

  return options;
}

module.exports = {
  createSubmission,
  getSubmission,
  getSubmissions,
  deleteSubmission,
};
