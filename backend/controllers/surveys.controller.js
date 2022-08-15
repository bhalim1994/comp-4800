const surveysService = require("../services/surveys.service.js");
const questionsService = require("../services/questions.service.js");
const choicesService = require("../services/choices.service.js");
const questionBranchesService = require("../services/questionBranches.service.js");

async function createSurvey(req, res) {
  try {
    const survey = req.body;
    await surveysService.createSurvey(survey);

    return res.status(201).json(survey);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getSurvey(req, res) {
  try {
    const { surveyId } = req.params;
    const survey = await surveysService.getSurvey(surveyId);

    return res.status(200).json(survey);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function getSurveys(req, res) {
  try {
    const surveys = await surveysService.getSurveys(req.query);
    return res.status(200).json(surveys);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function updateSurvey(req, res) {
  try {
    const survey = req.body;
    const { surveyId } = req.params;
    const updatedSurvey = await surveysService.updateSurvey(surveyId, survey);

    return res.status(200).json(updatedSurvey);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function deleteSurvey(req, res) {
  try {
    const surveyId = req.params.surveyId;
    const deleted = await surveysService.deleteSurvey(surveyId);

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

async function duplicateSurvey(req, res) {
  try {
    const { surveyId } = req.params;
    const survey = await surveysService.getSurvey(surveyId);
    const rawSurvey = survey.get({ plain: true });

    rawSurvey.name = `${rawSurvey.name} Duplicate`;

    // Duplicate survey
    const newSurvey = await surveysService.createSurvey(rawSurvey);

    // Duplicate questions and choices
    const requests = [];
    const qbOrderMap = [];
    const allChoices = await choicesService.getChoices({});
    const questionsWithoutIds = rawSurvey.questions.map((q, index) => {
      // Store question branch data in index map
      if (q.questionBranch) {
        let parentChoiceIndex;
        for (const question of rawSurvey.questions) {
          parentChoiceIndex = question.choices.findIndex(
            (c) => c.choiceId === q.questionBranch.choiceId
          );
          if (parentChoiceIndex !== -1) break;
        }
        const parentChoice = allChoices.find(
          (c) => c.choiceId === q.questionBranch.choiceId
        );
        const parentQuestionIndex = rawSurvey.questions.findIndex(
          (q) => q.questionId === parentChoice.questionId
        );
        qbOrderMap.push({
          childQuestionIndex: index,
          choiceIndex: parentChoiceIndex,
          parentQuestionIndex,
        });
      }

      return {
        ...q,
        questionId: undefined,
        surveyId: newSurvey.surveyId,
        choices: q.choices.map((c) => ({ ...c, choiceId: undefined })),
      };
    });

    questionsWithoutIds.forEach(async (q) => {
      requests.push(questionsService.createQuestionWithChoices(q));
    });
    await Promise.all(requests);

    // Get survey again to have associated choices and branches included, and new question and choice IDs
    const completeNewSurvey = (
      await surveysService.getSurvey(newSurvey.surveyId)
    ).get({ plain: true });

    // Duplicate question branches using index map
    for (const qbOrder of qbOrderMap) {
      const questions = completeNewSurvey.questions;
      const question = questions.find(
        (q, index) => index === qbOrder.childQuestionIndex
      );
      const parentQuestion = questions.find(
        (q, index) => index === qbOrder.parentQuestionIndex
      );
      const choice = parentQuestion.choices.find(
        (c, index) => index === qbOrder.choiceIndex
      );
      await questionBranchesService.createQuestionBranch({
        questionId: question.questionId,
        choiceId: choice.choiceId,
      });
    }

    return res.status(201).json(completeNewSurvey);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

module.exports = {
  createSurvey,
  getSurvey,
  getSurveys,
  deleteSurvey,
  updateSurvey,
  duplicateSurvey,
};
