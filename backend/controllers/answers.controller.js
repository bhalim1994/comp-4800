const answersService = require("../services/answers.service.js");

async function createAnswer(req, res) {
  try {
    const answer = req.body;
    await answersService.createAnswer(answer);

    return res.status(201).json(answer);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

// async function getAnswer(req, res) {
//   try {
//     const { answerId } = req.params;
//     const answer = await answersService.getAnswer(answerId);

//     return res.status(200).json(answer);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err.message);
//   }
// }

async function getAnswersByQuestion(req, res) {
  try {
    const { questionId } = req.params;
    const answers = await answersService.getAnswersByQuestion(questionId);
    return res.status(200).json(answers);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getAnswersBySubmission(req, res) {
    try {
      const { submissionId } = req.params;
      const answers = await answersService.getAnswersBySubmission(submissionId);
      return res.status(200).json(answers);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json(err.message);
    }
  }

// async function updateAnswer(req, res) {
//   try {
//     const answer = req.body;
//     const { answerId } = req.params;
//     const updatedAnswer = await answersService.updateAnswer(answerId, answer);

//     return res.status(200).json(updatedAnswer);
//   } catch (err) {
//     console.log(err);

//     return res.status(500).json(err.message);
//   }
// }

// async function updateAnswers(req, res) {
//   try {
//     const answers = req.body;
//     const updatedAnswers = await answersService.updateAnswers(answers);

//     return res.status(200).json(updatedAnswers);
//   } catch (err) {
//     console.log(err);

//     return res.status(500).json(err.message);
//   }
// }

// async function deleteAnswer(req, res) {
//   try {
//     const answerId = req.params.answerId;
//     const deleted = await answersService.deleteAnswer(answerId);
//     if (deleted) {
//       console.log(deleted);

//       return res.sendStatus(200);
//     } else {
//       return res.sendStatus(404);
//     }
//   } catch (err) {
//     console.log(err);

//     return res.status(500).json(err.message);
//   }
// }

module.exports = {
  createAnswer,
//   getAnswer,
  getAnswersByQuestion,
  getAnswersBySubmission,
//   deleteAnswer,
//   updateAnswer,
//   updateAnswers,
};
