const questionBranchesService = require("../services/questionBranches.service.js");

async function createQuestionBranch(req, res) {
  try {
    const questionBranch = req.body;
    const createdQuestionBranch =
      await questionBranchesService.createQuestionBranch(questionBranch);

    return res.status(201).json(createdQuestionBranch);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function getQuestionBranches(req, res) {
  try {
    const questionBranches = await questionBranchesService.getQuestionBranches(
      req.query
    );
    return res.status(200).json(questionBranches);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function deleteQuestionBranch(req, res) {
  try {
    const { choiceId, questionId } = req.query;
    const deleted = await questionBranchesService.deleteQuestionBranch(
      choiceId,
      questionId
    );

    if (deleted) return res.sendStatus(200);
    else return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

module.exports = {
  createQuestionBranch,
  getQuestionBranches,
  deleteQuestionBranch,
};
