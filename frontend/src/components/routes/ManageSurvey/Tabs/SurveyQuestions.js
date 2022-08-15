import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import classes from "../ManageSurvey.module.css";
import { Box } from "@mui/system";
import QuestionTable from "./QuestionTable";
import Button from "../../../UI/Button";
import { choiceCompatibleTypes } from "../../ManageQuestion/ManageQuestion";
import { Alert } from "@mui/material";

const SurveyQuestions = ({ surveyId }) => {
  const { response: questions, fetchData: fetchQuestions } = useAxiosGet(
    `/questions?surveyId=${surveyId}`
  );
  const { response: submissions, isLoading } = useAxiosGet(
    `/submissions?surveyId=${surveyId}`
  );

  const hasSubmissions = submissions.length > 0;

  const navigate = useNavigate();

  const handleCreateQuestion = () => {
    navigate(`/surveys/${surveyId}/questions/create`);
  };

  console.log(choiceCompatibleTypes);

  const questionsWithoutChoices = questions.filter(
    ({ answerType, choices }) =>
      choiceCompatibleTypes.includes(answerType) && choices.length < 1
  );

  const matrixWithoutCriteria = questions.filter(
    ({ answerType, description }) =>
      answerType === "Matrix" && JSON.parse(description).length < 2
  );

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          icon="add"
          onClick={handleCreateQuestion}
          variant="contained"
          className={classes.createButton}
          disabled={isLoading || hasSubmissions}
        >
          Create Question
        </Button>
      </Box>
      {questionsWithoutChoices.map((q) => (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <b>Q{q.order + 1}</b> must contain at least one <b>choice</b> in order
          to receive a response from survey takers.
        </Alert>
      ))}
      {matrixWithoutCriteria.map((q) => (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <b>Q{q.order + 1}</b> must contain at least one <b>criteria</b> in
          order to receive a response from survey takers because it is a matrix
          question.
        </Alert>
      ))}

      <QuestionTable
        surveyId={surveyId}
        questions={questions}
        fetchQuestions={fetchQuestions}
        hasSubmissions={hasSubmissions}
      />
    </Box>
  );
};

export default SurveyQuestions;
