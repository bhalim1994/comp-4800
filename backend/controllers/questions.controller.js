const questionsService = require("../services/questions.service.js");

async function createQuestion(req, res) {
  try {
    const question = req.body;
    const maxOrder = await questionsService.getMaxOrderBySurveyId(
      question.surveyId
    );
    question.order = maxOrder + 1;

    const createdQuestion = await questionsService.createQuestion(question);

    return res.status(201).json(createdQuestion);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getQuestion(req, res) {
  try {
    const { questionId } = req.params;
    const question = await questionsService.getQuestion(questionId);

    return res.status(200).json(question);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function getQuestions(req, res) {
  try {
    const questions = await questionsService.getQuestions(req.query);
    return res.status(200).json(questions);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function updateQuestion(req, res) {
  try {
    const question = req.body;
    const { questionId } = req.params;
    const updatedQuestion = await questionsService.updateQuestion(
      questionId,
      question
    );

    return res.status(200).json(updatedQuestion);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function updateQuestions(req, res) {
  try {
    const questions = req.body;
    const updatedQuestions = await questionsService.updateQuestions(questions);

    return res.status(200).json(updatedQuestions);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function deleteQuestion(req, res) {
  try {
    const questionId = req.params.questionId;
    const question = await questionsService.getQuestion(questionId);
    const deleted = await questionsService.deleteQuestion(questionId);
    const questions = await questionsService.getQuestions({
      surveyId: question.surveyId,
    });

    const reorderedQuestions = questions
      .sort((q1, q2) => q1.order - q2.order)
      .map((q, index) => ({
        ...q,
        order: index,
      }));

    const requests = [];
    reorderedQuestions.forEach((question) => {
      requests.push(
        questionsService.updateQuestion(question.questionId, question)
      );
    });

    await Promise.all(requests);

    if (deleted) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(500);
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function duplicateQuestion(req, res) {
  try {
    const { questionId } = req.params;
    const question = await questionsService.getQuestion(questionId);

    const maxOrder = await questionsService.getMaxOrderBySurveyId(
      question.surveyId
    );
    question.order = maxOrder + 1;

    // Stripping Sequelize meta data and choiceId's from choice list
    const rawChoices = question.choices.map((c) => {
      const {
        dataValues: { choiceId, ...duplicateChoice },
      } = c;
      return duplicateChoice;
    });
    question.choices = rawChoices;

    question.description = question.description + " ***DUPLICATE***";

    const duplicatedQuestion = await questionsService.createQuestionWithChoices(
      question
    );

    return res.status(201).json(duplicatedQuestion);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  updateQuestions,
  duplicateQuestion,
};
