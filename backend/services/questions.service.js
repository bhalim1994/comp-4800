const { Question, Choice } = require("../models/index");
const { getMaxOrder } = require("../utils/modelHelper");

async function createQuestion(question) {
  const { description, answerType, surveyId, order, required, charLimit } =
    question;

  const createdQuestion = await Question.create({
    description: description,
    answerType: answerType,
    surveyId: surveyId,
    order: order,
    required: required,
    charLimit: charLimit,
  });

  return createdQuestion;
}

async function createQuestionWithChoices(question) {
  const {
    description,
    answerType,
    surveyId,
    order,
    choices,
    required,
    charLimit,
  } = question;

  const createdQuestion = await Question.create(
    {
      description: description,
      answerType: answerType,
      surveyId: surveyId,
      order: order,
      choices: choices,
      required: required,
      charLimit: charLimit,
    },
    { include: [{ model: Choice, as: "choices" }] }
  );

  return createdQuestion;
}

async function getQuestion(questionId) {
  const options = {};
  const aliasedChoice = { model: Choice, as: "choices" };

  options.include = [{ ...aliasedChoice }];

  options.order = [[aliasedChoice, "order", "ASC"]];

  const question = await Question.findByPk(questionId, options);
  return question;
}

async function getQuestions(params) {
  const options = getAllWhereOptions(params);
  const aliasedChoice = { model: Choice, as: "choices" };

  options.include = [{ ...aliasedChoice }];

  options.order = [
    ["order", "ASC"],
    [aliasedChoice, "order", "ASC"],
  ];

  const questions = await Question.findAll(options);
  const rawQuestions = questions.map((el) => el.get({ plain: true }));
  return rawQuestions;
}

async function updateQuestion(questionId, question) {
  const { description, answerType, order, required, charLimit } = question;

  const dbQuestion = await Question.findOne({
    where: { questionId },
  });

  dbQuestion.order = order;
  dbQuestion.description = description;
  dbQuestion.answerType = answerType;
  dbQuestion.required = required;
  dbQuestion.charLimit = charLimit;

  await dbQuestion.save();

  return dbQuestion;
}

async function updateQuestions(questions) {
  const requests = [];

  questions.forEach((question) => {
    requests.push(updateQuestion(question.questionId, question));
  });

  await Promise.all(requests);

  return questions;
}

async function deleteQuestion(questionId) {
  const question = await Question.findOne({ where: { questionId } });

  if (question === null) {
    return false;
  } else {
    await question.destroy();

    return true;
  }
}

function getAllWhereOptions(params) {
  const { description, componentType, surveyId } = params;
  const options = {
    where: {},
  };

  if (description !== undefined) options.where.description = description;
  if (componentType !== undefined) options.where.componentType = componentType;
  if (surveyId !== undefined) options.where.surveyId = surveyId;

  return options;
}

async function getMaxOrderBySurveyId(surveyId) {
  const questions = await getQuestions({
    surveyId: surveyId,
  });

  return getMaxOrder(questions);
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  updateQuestions,
  getMaxOrderBySurveyId,
  createQuestionWithChoices,
};
