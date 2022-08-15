const { QuestionBranch, Choice, Question } = require("../models/index");

async function createQuestionBranch(questionBranch) {
  const { choiceId, questionId } = questionBranch;

  const createQuestionBranch = await QuestionBranch.create({
    choiceId,
    questionId,
  });

  return createQuestionBranch;
}

async function getQuestionBranch(choiceId, questionId) {
  const questionBranch = await QuestionBranch.findOne({
    where: { choiceId, questionId },
  });
  return questionBranch;
}

async function getQuestionBranches(params) {
  const options = getAllWhereOptions(params);
  const aliasedChoice = { model: Choice, as: "choice" };
  const aliasedQuestion = { model: Question, as: "question" };

  options.include = [{ ...aliasedChoice, include: [aliasedQuestion] }];

  const questionBranches = await QuestionBranch.findAll(options);
  return questionBranches;
}

async function deleteQuestionBranch(choiceId, questionId) {
  const questionBranch = await QuestionBranch.findOne({
    where: { choiceId, questionId },
  });

  if (questionBranch === null) {
    return false;
  } else {
    await questionBranch.destroy();
    return true;
  }
}

function getAllWhereOptions(params) {
  const { choiceId, questionId } = params;
  const options = {
    where: {},
  };

  if (choiceId !== undefined) options.where.choiceId = choiceId;
  if (questionId !== undefined) options.where.questionId = questionId;

  return options;
}

module.exports = {
  createQuestionBranch,
  getQuestionBranch,
  getQuestionBranches,
  deleteQuestionBranch,
};
