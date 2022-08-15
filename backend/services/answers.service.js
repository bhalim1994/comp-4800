const { Answer } = require("../models/index");
const db = require("../models/index");

async function createAnswer(answer) {
  const { value, submissionId, questionId } = answer;

  const createdAnswer = await Answer.create({
    value,
    submissionId,
    questionId
  });

  return createdAnswer;
}

// async function getAnswer(submissionId, questionId) {
//   const answer = await Answer.findByPk(submissionId, questionId);

//   return answer;
// }

async function getAnswersByQuestion(params) {
  const options = getAllWhereOptionsQuestion(params);

  const answers = await Answer.findAll(options);
  return answers;
}

async function getAnswersBySubmission(params) {
  const options = getAllWhereOptionsSubmission(params);

  const answers = await Answer.findAll(options);
  return answers;
}

// async function updateAnswer(answerId, answer) {
//   const { value, order } = answer;

//   const dbAnswer = await Answer.findOne({ where: { answerId } });

//   dbAnswer.value = value;
//   dbAnswer.order = order;

//   await dbAnswer.save();

//   return dbAnswer;
// }

// async function updateAnswers(answers) {
//   const requests = [];

//   answers.forEach((answer) => {
//     requests.push(updateAnswer(answer.answerId, answer));
//   });

//   await Promise.all(requests);

//   return answers;
// }

// async function deleteAnswer(answerId) {
//   const answer = await Answer.findOne({ where: { answerId } });

//   if (answer === null) {
//     return false;
//   } else {
//     await answer.destroy();
//     return true;
//   }
// }

function getAllWhereOptionsQuestion(params) {
  const { value, questionId } = params;
  const options = {
    where: { questionId: params },
  };

  if (value !== undefined) options.where.value = value;
  if (questionId !== undefined) options.where.questionId = questionId;

  return options;
}

function getAllWhereOptionsSubmission(params) {
  const { value, submissionId } = params;
  const options = {
    where: { submissionId: params },
  };

  if (value !== undefined) options.where.value = value;
  if (submissionId !== undefined) options.where.submissionId = submissionId;

  return options;
}

module.exports = {
  createAnswer,
  // getAnswer,
  getAnswersBySubmission,
  getAnswersByQuestion,
  // deleteAnswer,
  // updateAnswer,
  // updateAnswers,
};
