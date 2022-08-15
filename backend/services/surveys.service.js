const {
  Survey,
  Question,
  User,
  Choice,
  QuestionBranch,
} = require("../models/index");
const db = require("../models/index");

async function createSurvey(survey) {
  const { name, description, type, userId } = survey;

  const createdSurvey = await Survey.create({
    name: name,
    description: description,
    type: type,
    userId: userId,
  });

  return createdSurvey;
}

async function getSurvey(surveyId) {
  const options = {};
  const aliasedQuestion = { model: Question, as: "questions" };
  const aliasedChoice = { model: Choice, as: "choices" };
  const aliasedQuestionBranch = {
    model: QuestionBranch,
    as: "questionBranch",
  };

  options.include = [
    {
      ...aliasedQuestion,
      include: [aliasedChoice, aliasedQuestionBranch],
    },
  ];

  options.order = [
    [aliasedQuestion, "order", "ASC"],
    [aliasedQuestion, aliasedChoice, "order", "ASC"],
  ];

  const survey = await Survey.findByPk(surveyId, options);
  return survey;
}

async function getSurveys(params) {
  const options = getAllWhereOptions(params);

  options.include = [
    {
      model: Question,
      as: "questions",
    },
    {
      model: User,
      as: "user",
      attributes: ["firstName", "lastName"],
    },
  ];

  options.order = [["updatedAt", "DESC"]];

  const surveys = await Survey.findAll(options);
  return surveys;
}

async function updateSurvey(surveyId, survey) {
  const { name, description, type, active } = survey;

  const dbSurvey = await Survey.findOne({ where: { surveyId } });

  if (name !== undefined) dbSurvey.name = name;
  if (description !== undefined) dbSurvey.description = description;
  if (type !== undefined) dbSurvey.type = type;
  if (active !== undefined) dbSurvey.active = active;

  await dbSurvey.save();

  return dbSurvey;
}

async function deleteSurvey(surveyId) {
  const survey = await Survey.findOne({ where: { surveyId } });

  if (survey === null) {
    return false;
  } else {
    await survey.destroy();
    return true;
  }
}

function getAllWhereOptions(params) {
  const { name, type } = params;
  const options = {
    where: {},
  };

  if (name !== undefined) options.where.name = name;
  if (type !== undefined) options.where.type = type;

  return options;
}

module.exports = {
  createSurvey,
  getSurvey,
  getSurveys,
  deleteSurvey,
  updateSurvey,
};
