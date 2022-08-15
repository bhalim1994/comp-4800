const choicesService = require("../services/choices.service.js");
const { getMaxOrder } = require("../utils/modelHelper");

async function createChoice(req, res) {
  try {
    const choice = req.body;

    const choices = await choicesService.getChoices({
      questionId: choice.questionId,
    });
    const newOrder = getMaxOrder(choices) + 1;

    await choicesService.createChoice({ ...choice, order: newOrder });

    return res.status(201).json(choice);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getChoice(req, res) {
  try {
    const { choiceId } = req.params;
    const choice = await choicesService.getChoice(choiceId);

    return res.status(200).json(choice);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function getChoices(req, res) {
  try {
    const choices = await choicesService.getChoices(req.query);
    return res.status(200).json(choices);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function updateChoice(req, res) {
  try {
    const choice = req.body;
    const { choiceId } = req.params;
    const updatedChoice = await choicesService.updateChoice(choiceId, choice);

    return res.status(200).json(updatedChoice);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function updateChoices(req, res) {
  try {
    const choices = req.body;
    const updatedChoices = await choicesService.updateChoices(choices);

    return res.status(200).json(updatedChoices);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function deleteChoice(req, res) {
  try {
    const choiceId = req.params.choiceId;
    const deleted = await choicesService.deleteChoice(choiceId);
    if (deleted) {
      console.log(deleted);

      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

module.exports = {
  createChoice,
  getChoice,
  getChoices,
  deleteChoice,
  updateChoice,
  updateChoices,
};
