const { Choice } = require("../models/index");

async function createChoice(choice) {
  const { value, order, questionId } = choice;

  const createdChoice = await Choice.create({
    value,
    order,
    questionId,
  });

  return createdChoice;
}

async function getChoice(choiceId) {
  const choice = await Choice.findByPk(choiceId);

  return choice;
}

async function getChoices(params) {
  const options = getAllWhereOptions(params);

  options.order = [["order", "ASC"]];

  const choices = await Choice.findAll(options);
  return choices;
}

async function updateChoice(choiceId, choice) {
  const { value, order } = choice;

  const dbChoice = await Choice.findOne({ where: { choiceId } });

  dbChoice.value = value;
  dbChoice.order = order;

  await dbChoice.save();

  return dbChoice;
}

async function updateChoices(choices) {
  const requests = [];

  choices.forEach((choice) => {
    requests.push(updateChoice(choice.choiceId, choice));
  });

  await Promise.all(requests);

  return choices;
}

async function deleteChoice(choiceId) {
  const choice = await Choice.findOne({ where: { choiceId } });

  if (choice === null) {
    return false;
  } else {
    await choice.destroy();
    return true;
  }
}

function getAllWhereOptions(params) {
  const { value, questionId } = params;
  const options = {
    where: {},
  };

  if (value !== undefined) options.where.value = value;
  if (questionId !== undefined) options.where.questionId = questionId;

  return options;
}

module.exports = {
  createChoice,
  getChoice,
  getChoices,
  deleteChoice,
  updateChoice,
  updateChoices,
};
