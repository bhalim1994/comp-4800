import React, { useEffect, useReducer } from "react";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
} from "@mui/material";
import Heading from "../../UI/typography/Heading";
import Subtitle from "../../UI/typography/Subtitle";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAxiosGet from "../../../hooks/useAxiosGet";
import Question, { TYPES } from "./Question";
import AppLoader from "../../UI/loading/AppLoader/AppLoader";
import { ACTIONS, questionsReducer } from "./reducer";
import { createSubmission } from "../../../services/api/submissionAxios";
import rp from "../../routing/routePaths";
import useSurveys from "../../../hooks/useSurveys";
import moment from "moment";
import classes from "./SubmitSurvey.module.css";
import { toast } from "react-toastify";

const SubmitSurvey = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { submit, checkSubmit } = useSurveys();
  const [submission, dispatch] = useReducer(questionsReducer, null);
  const {
    response: survey,
    isLoading,
    error,
  } = useAxiosGet(`/surveys/${surveyId}`);
  const {
    response: branches,
    isLoading: branchesLoading,
    error: branchesError,
  } = useAxiosGet(`/questionBranches`);

  useEffect(() => {
    if (!isLoading && !submission) {
      dispatch({ type: ACTIONS.INITIALIZE, payload: survey.questions });
    }
  }, [isLoading, survey, submission]);

  const onInputChange = (payload) => {
    dispatch({ type: ACTIONS.UPDATE, payload });
  };

  const onSubmissionChange = (payload) => {
    dispatch({ type: ACTIONS.UPDATE_ALL, payload });
  };

  const _getValueBasedOnId = (id) => {
    const val = submission?.find(({ questionId }) => id === questionId).value;
    return val ? val : "";
  };

  const _validateSubmission = (submission) => {
    let isValid = true;

    // Require multi select questions that are required
    getRenderedQuestions().forEach((renderedQuestion, index) => {
      const submissionAnswer = submission.find(
        (q) => q.questionId === renderedQuestion.questionId
      );
      if (
        renderedQuestion.answerType === TYPES.MS &&
        renderedQuestion.required &&
        submissionAnswer &&
        submissionAnswer.value.length < 1
      ) {
        isValid = false;
        toast.warning(`Question #${index + 1} is required`);
      }
    });

    return isValid;
  };

  const submitSurvey = async (e) => {
    e.preventDefault();

    if (!_validateSubmission(submission)) return;

    await createSubmission(submission);
    submit(surveyId);
    navigate(rp.completedSurvey.replace(":surveyId", surveyId));
  };

  const getRenderedQuestions = () => {
    return survey.questions.filter(({ questionId }) =>
      _shouldDisplayQuestion(questionId)
    );
  };

  const _shouldDisplayQuestion = (questionId) => {
    const question = survey.questions.find((q) => q.questionId === questionId);
    if (!_hasBranch(question)) return true;

    const branch = question.questionBranch;

    const branchTriggerQuestion = submission?.find((q) => {
      if (q.choiceIdList) {
        return q.choiceIdList.some((choiceId) => choiceId === branch.choiceId);
      } else {
        return q.choiceId === branch.choiceId;
      }
    });

    return Boolean(branchTriggerQuestion);
  };

  const _hasBranch = (question) => question.questionBranch !== null;

  if (error || branchesError) return <Navigate to={rp.default} />;
  if (isLoading || branchesLoading) return <AppLoader />;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {survey.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.subtitle}>
        <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
          <Card sx={{ p: 3, mb: 2, borderRadius: 2.5 }} variant="outlined">
            <Heading>{survey.name}</Heading>
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {survey.description}
            </Typography>
          </Card>

          {checkSubmit(surveyId) ? (
            <Subtitle>
              You submitted a response for this survey{" "}
              {moment(checkSubmit(surveyId).time).fromNow()}.
            </Subtitle>
          ) : !survey.active ? (
            <Subtitle>
              This survey is currently closed. The survey has either not opened
              yet (please come back at a later time) or you've missed the
              deadline.
            </Subtitle>
          ) : (
            <>
              <form onSubmit={submitSurvey}>
                {getRenderedQuestions().map((q, i) => (
                  <Question
                    submissionQuestion={submission?.find(
                      ({ questionId }) => questionId === q.questionId
                    )}
                    question={q}
                    choices={q.choices.sort((c1, c2) => c1.order - c2.order)}
                    onChange={onInputChange}
                    val={_getValueBasedOnId(q.questionId)}
                    index={i}
                    key={i}
                    branches={branches}
                    onSubmissionChange={onSubmissionChange}
                    submission={submission}
                    questions={survey?.questions}
                  />
                ))}
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submitButton}
                >
                  Submit
                </Button>
              </form>
            </>
          )}
        </Container>
      </div>
    </Box>
  );
};

export default SubmitSurvey;
