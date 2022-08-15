// import classes from "../ManageSurvey.module.css";
import QuestionPreview from "../../ManageQuestion/QuestionPreview/QuestionPreview";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import { Box, Container, Stack, Typography } from "@mui/material";
import Card from "../../../UI/Card/Card";
import SubHeading from "../../../UI/typography/SubHeading";
import Subtitle from "../../../UI/typography/Subtitle";

function Answer({ value }) {
  return (
    <Stack
      mt={3}
      mb={7}
      border={1}
      borderColor="primary.main"
      borderRadius={1}
      p={2.5}
    >
      <Typography color="primary" fontWeight={600} mb={0.5}>
        Answer
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

const SurveyPreview = ({ surveyId, submissionId, disabled = false }) => {
  const { response: survey } = useAxiosGet(`/surveys/${surveyId}`);

  const { response: submission } = useAxiosGet(
    `/submissions/${submissionId}`,
    submissionId ? true : false
  );

  const getAnswerValue = (question) => {
    const answer = submission.answers?.find(
      (a) => a.questionId === question.questionId
    );

    if (question.answerType === "MultiSelect") {
      const parsedAnswer = JSON.parse(answer.value);
      return parsedAnswer.join(", ");
    }

    if (question.answerType === "Matrix") {
      return (
        <table>
          {JSON.parse(question.description).map(
            (v, i) =>
              i !== 0 && (
                <tr>
                  <td>{v}:</td>
                  <td>{JSON.parse(answer.value)[i - 1]}</td>
                </tr>
              )
          )}
        </table>
      );
    }

    return answer ? answer.value : "N/A";
  };

  return (
    <Container maxWidth="md">
      <Box>
        <Card>
          <SubHeading>{survey.name}</SubHeading>
          <Subtitle>{survey.description}</Subtitle>
          {survey.questions?.map((question) => (
            <Box key={question.questionId}>
              <QuestionPreview
                question={question}
                choices={question.choices}
                disabled={disabled}
                displayingAnswer={submissionId ? true : false}
              />
              {submissionId && submission.answers && (
                <Answer value={getAnswerValue(question)} />
              )}
            </Box>
          ))}
        </Card>
      </Box>
    </Container>
  );
};

export default SurveyPreview;
