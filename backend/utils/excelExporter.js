const questionService = require("../services/questions.service.js");
const surveyService = require("../services/surveys.service.js");
const choiceService = require("../services/choices.service.js");
const submissionService = require("../services/submissions.service.js");
const questionBranchesService = require("../services/questionBranches.service.js");
const oc = require("office-chart");

async function exportToExcel(data) {
  const gen = new oc.XlsxGenerator();
  await gen.createWorkbook();

  const branches = await questionBranchesService.getQuestionBranches("");
  var linkedQuestions = [];
  branches.map(m => {
    linkedQuestions.push(m.questionId);
  });
  var sheets = {}; // dictionary of sheets

  // populate sheet dictionary
  // key = questionId, value = [number of responses, submission date, value (of answer)]
  for (const d of data) {
    const submission = await submissionService.getSubmission(d[0]);
    const dateFormat = { year: "numeric", month: "short", day: "numeric" };
    const submissionDate = submission.createdAt.toLocaleDateString(
      "en-US",
      dateFormat
    );
    const row = [submissionDate, d[2]];
    if (!(d[1] in sheets)) {
      sheets[d[1]] = [row];
    } else {
      sheets[d[1]].push(row);
    }
  }

  // For each question, create sheet
  // key = questionId, value = [submissionId, questionId, value (of answer)]
  for (const [key, value] of Object.entries(sheets)) {
    const question = await questionService.getQuestion(key);
    const survey = await surveyService.getSurvey(question.surveyId);
    var numResponses = 0;
    var flags = []; // for flags
    var newlines = []; // newlines
    for (let i = 0; i < 10; i++) newlines.push([]);

    // Counting responses
    value.forEach(function (v) {
      if (v[1] != "[]" && v[1] != "") {
        numResponses++;
      }
    });
    
    // Flag logic
    if (linkedQuestions.includes(question.questionId)) {
      flags.push(["WARNING: This is a branching question (may not have been answered by all respondents). Data and flags may be skewed!"]);
      flags.push([]);
    }

    if (parseFloat(numResponses / value.length) < 0.3) {
      flags.push(["FLAG: Response rate for this question is less than 30%!"]);
    }

    // ***Do not add spaces in sheet name, this will mess up the chart***
    const sheet = await gen.createWorksheet("Question" + (question.order + 1));

    // Handling SingleSelect: format choices and count responses
    if (question.answerType == "SingleSelect" || question.answerType == "MultiSelect") {
      const choices = await choiceService.getChoices({
        questionId: question.questionId,
      });

      const sortedChoices = [...choices].sort((c1, c2) => c1.order - c2.order);
      choiceValues = [];
      choiceValues = sortedChoices.map((c) => c.value);

      var answerResponseMatrix = []; // for excel data

      // populate above data structures
      choiceValues.forEach(function (c) {
        let count = 0;
        value.forEach(function (v) {
          if ((question.answerType == "SingleSelect" && v[1] == c) ||
          (question.answerType == "MultiSelect" && v[1].includes(c))) {
            count++;
          }
        });
        let answerResponseMap = [];
        let percentage = parseFloat(count / numResponses);
        if (numResponses == 0) {
          answerResponseMap = [c, count, 0];
        } else {
          answerResponseMap = [c, count, percentage.toFixed(4) * 100];
        }
        answerResponseMatrix.push(answerResponseMap);

        //flag logic
        if (percentage > 0.85) {
          flags.push([
            'FLAG: Response "' + c + '" has over 85% of response rate!',
          ]);
        }
        if (percentage < 0.15) {
          flags.push([
            'FLAG: Response "' + c + '" has less than 15% of response rate!',
          ]);
        }
      });

      // ***Data in chart must be at the top for chart to work, do not change the order here***
      await sheet.addTable([
        ["Answer choices", "Responses", "Percentage"],
        ...answerResponseMatrix,
        [],
        [
          "Response rate: " +
            parseFloat(numResponses / value.length).toFixed(4) * 100 +
            "%",
        ],
        ["Total respondents: " + numResponses],
        [],
        [survey.name],
        [question.description],
        ...newlines,
        ...flags,
      ]);

      const chartRange = "B1:B" + (1 + answerResponseMatrix.length);
      const chartOpt = {
        title: {
          name: "Question " + (question.order + 1) + " Responses",
          color: "000000",
          size: 3000,
        },
        range: chartRange,
        type: "bar",
        // bar colors will alternate even if only 1 color is specified
        rgbColors: ["FF0000", "00FF00", "0000FF", "770000", "007700", "000077"],
        labels: true,
        marker: {
          size: 4,
          shape: "square", //marker shapes, can be circle, diamond, star
        },
        lineWidth: 20000,
      };
      await sheet.addChart(chartOpt);
    } 

    // Handling Matrix-type questions

    else if (question.answerType == "Matrix") {
      var criteriaDictionary = {};

      // Split Criteria from Question description
      var criteria = JSON.parse(question.description);
      const tail = ([skipDescription, ...criteria]) => criteria;
      criteria = tail(criteria);
      var emptyMatrix = false;

      // Modify "value" to split answer value into multiple array elements
      value.forEach(function (v) {
        if (v[1] != "" && v[1] != "[]") {
          let criteriaAnswer = (JSON.parse(v[1]));
          v.pop();
          v.push(...criteriaAnswer);

          // Populate dictionary of Criteria objects and corresponding answers
          for (let a = 1; a < v.length; a++) {
            if (!(criteria[a-1] in criteriaDictionary)) {
              criteriaDictionary[criteria[a-1]] = [v[a]];
            } else {
              criteriaDictionary[criteria[a-1]].push(v[a]);
            }
          }
        }
      });

      if (Object.keys(criteriaDictionary).length === 0) {
        emptyMatrix = true;
      }

      if (!emptyMatrix) {
        // Get matrix choices
        const choices = await choiceService.getChoices({
          questionId: question.questionId,
        });

        const sortedChoices = [...choices].sort((c1, c2) => c1.order - c2.order);
        choiceValues = [];
        choiceValues = sortedChoices.map((c) => c.value);

        // Creating sheet with chart for each criterion
        for (let i = 0; i < criteria.length; i++) {
          const criterion = await gen.createWorksheet("Question" + (question.order + 1) + (String.fromCharCode(97 + i)));
          var answerResponseMatrix = []; // for excel data
          const choiceAnswers = criteriaDictionary[criteria[i]];
          // Populate chart data
          choiceValues.forEach(function (choice) {
            let count = 0;
            choiceAnswers.forEach(function (ca) {
              if (ca == choice) count++;
            })
            let percentage = parseFloat(count / numResponses);
            let answerResponseMap = [choice, count, percentage.toFixed(4) * 100];
            answerResponseMatrix.push(answerResponseMap);

            //flag logic
            if (percentage > 0.85) {
              flags.push([
                'FLAG: Response "' + choice + '" has over 85% of response rate!',
              ]);
            }
            if (percentage < 0.15) {
              flags.push([
                'FLAG: Response "' + choice + '" has less than 15% of response rate!',
              ]);
            }
          });
          await criterion.addTable([
            ["Answer choices", "Responses", "Percentage"],
            ...answerResponseMatrix,
            [],
            [
              "Response rate: " +
                parseFloat(numResponses / value.length).toFixed(4) * 100 +
                "%",
            ],
            ["Total respondents: " + numResponses],
            [],
            [survey.name],
            [JSON.parse(question.description)[0]],
            [criteria[i]],
            ...newlines,
            ...flags,
          ]);
          flags = [];
          const chartRange = "B1:B" + (1 + answerResponseMatrix.length);
          const chartOpt = {
            title: {
              name: criteria[i],
              color: "000000",
              size: 3000,
            },
            range: chartRange,
            type: "bar",
            // bar colors will alternate even if only 1 color is specified
            rgbColors: ["FF0000", "00FF00", "0000FF", "770000", "007700", "000077"],
            labels: true,
            marker: {
              size: 4,
              shape: "square", //marker shapes, can be circle, diamond, star
            },
            lineWidth: 20000,
          };
          await criterion.addChart(chartOpt);

          await sheet.addTable([
            [survey.name],
            [JSON.parse(question.description)[0]],
            [],
            [
              "Response rate: " +
                parseFloat(numResponses / value.length).toFixed(4) * 100 +
                "%",
            ],
            ["Total respondents: " + numResponses],
            [],
            ["Response Date", ...criteria],
            ...value,
            ...newlines,
            ...flags,
          ]);
        }
      } else {
        await sheet.addTable([
          [survey.name],
          [JSON.parse(question.description)[0]],
          [],
          [
            "Response rate: 0%",
          ],
          ["Total respondents: 0"],
        ]);
      }
    }

    else {
      // Handling sheet data for all other question types
      await sheet.addTable([
        [survey.name],
        [question.description],
        [],
        [
          "Response rate: " +
            parseFloat(numResponses / value.length).toFixed(4) * 100 +
            "%",
        ],
        ["Total responses: " + numResponses],
        [],
        ["Response Date", "Responses"],
        ...value,
        ...newlines,
        ...flags,
      ]);
    }
  }

  await gen.generate("./outputFiles/excel-from-js", "file");
}

async function exportOfficeChart(allAnswers) {
  var answers = [];
  allAnswers.forEach(function (s) {
    s.forEach(function (a) {
      answers.push(a);
    });
  });
  const data = answers.map((answer) => {
    return [answer.submissionId, answer.questionId, answer.value];
  });
  await exportToExcel(data);
}

module.exports = {
  exportOfficeChart,
};
