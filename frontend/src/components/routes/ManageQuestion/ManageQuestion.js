import { Box, Stack, Grid, IconButton, Tooltip, Alert } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosGet from "../../../hooks/useAxiosGet";
import {
  createQuestion,
  updateQuestion,
} from "../../../services/api/questionAxios";
import AutoComplete from "../../controls/AutoComplete";
import Input from "../../controls/Input";
import Card from "../../UI/Card/Card";
import Heading from "../../UI/typography/Heading";
import SubHeading from "../../UI/typography/SubHeading";
import ManageChoices from "./ManageChoices/ManageChoices";
import classes from "./ManageQuestion.module.css";
import QuestionPreview from "./QuestionPreview/QuestionPreview";
import { deleteQuestion } from "../../../services/api/questionAxios";
import CheckBox from "../../controls/CheckBox";
import HelpIcon from "@mui/icons-material/Help";
import rp from "../../routing/routePaths";
import { TYPES } from "../SubmitSurvey/Question";
import ManageCategories from "./ManageCategories/ManageCategories";
import Button from "../../UI/Button";

export const infoButtonStyles = { width: 48, height: 48 };

const answerTypes = [
  { label: "Single Select", value: "SingleSelect" },
  { label: "Multi Select", value: "MultiSelect" },
  { label: "Short Answer", value: "ShortAnswer" },
  { label: "Long Answer", value: "LongAnswer" },
  { label: "Matrix", value: "Matrix" },
];

export const choiceCompatibleTypes = ["SingleSelect", "MultiSelect", "Matrix"];

const writtenTypes = [answerTypes[2].value, answerTypes[3].value];

const defaultValues = {
  description: "",
  answerType: answerTypes[0],
  required: false,
  charLimit: 20,
};

const ManageQuestion = () => {
  const { surveyId, questionId } = useParams();
  const mode = questionId === "create" ? "create" : "edit";
  const navigate = useNavigate();

  const { response: submissions, isLoading } = useAxiosGet(
    `/submissions?surveyId=${surveyId}`
  );

  const hasSubmissions = submissions.length > 0;

  const {
    response: question,
    isLoading: questionLoading,
    fetchData: fetchQuestion,
  } = useAxiosGet(`/questions/${questionId}`);

  const { response: choices, fetchData: fetchChoices } = useAxiosGet(
    `/choices?questionId=${questionId}`
  );

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  });

  const parsedDescription =
    question?.answerType === TYPES.MA
      ? JSON.parse(question?.description)
      : undefined;

  useEffect(() => {
    if (!question) return;
    const isMatrix = question.answerType === TYPES.MA;
    reset({
      ...question,
      description: isMatrix
        ? JSON.parse(question.description)[0]
        : question.description,
      answerType: answerTypes.find((at) => at.value === question.answerType),
    });
  }, [question, reset]);

  const handleUpdateQuestion = async (data) => {
    const {
      answerType: { value },
      charLimit,
      description,
      ...restData
    } = data;
    const isMatrix = value === TYPES.MA;
    const wasMatrix = question.answerType === TYPES.MA;

    let newDesc;
    if (isMatrix && wasMatrix) {
      const parsedDesc = [...JSON.parse(question.description)];
      newDesc = JSON.stringify(
        parsedDesc.map((val, index) => (index === 0 ? description : val))
      );
    } else if (isMatrix) {
      newDesc = JSON.stringify([description]);
    } else {
      newDesc = description;
    }

    await updateQuestion(questionId, {
      answerType: value,
      description: newDesc,
      order: question.order,
      charLimit: parseInt(charLimit),
      ...restData,
    });
    await fetchQuestion();
  };

  const handleCreateQuestion = async (data) => {
    const {
      answerType: { value },
      description,
      required,
      charLimit,
    } = data;
    const isMatrix = value === TYPES.MA;
    const createdQuestion = await createQuestion({
      answerType: value,
      description: isMatrix ? JSON.stringify([description]) : description,
      surveyId,
      required,
      charLimit,
    });
    const { questionId } = createdQuestion;
    navigate(`/surveys/${surveyId}/questions/${questionId}`);
  };

  const handleNavToCreateQuestion = () => {
    reset(defaultValues);
    navigate(`/surveys/${surveyId}/questions/create`);
  };

  const handleDeleteQuestion = async (questionId) => {
    await deleteQuestion(questionId);
    navigate(rp.manageSurveyQuestions.replace(":surveyId", surveyId));
  };

  if (hasSubmissions) {
    navigate(rp.manageSurveyQuestions.replace(":surveyId", surveyId));
  }

  const getAnswerTypeTooltipText = () => {
    switch (watch("answerType")?.value) {
      case answerTypes[0].value:
        return `Allows the user to choose one answer from a list of choices.`;
      case answerTypes[1].value:
        return `Allows the user to choose multiple answers from a list of choices.`;
      case answerTypes[2].value:
        return `Displays a text box that lets users enter a single line of text.`;
      case answerTypes[3].value:
        return `Displays a large text box that lets users provide multi-line input. They can also press Enter on their keyboard to add lines and extend the box.`;
      case answerTypes[4].value:
        return `Allows the user to select one answer from each row of choices. The number of rows is determined by how many categories you define.`;
      default:
        return `Select an answer type to see more information.`;
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Heading gutterBottom>Question Details</Heading>
        <Button
          icon="add"
          onClick={handleNavToCreateQuestion}
          variant="contained"
          className={classes.createButton}
          disabled={isLoading || hasSubmissions}
          sx={mode === "create" ? { visibility: "hidden" } : {}}
        >
          Create New Question
        </Button>
      </Box>
      {choiceCompatibleTypes.includes(question.answerType) &&
        choices.length < 1 &&
        mode === "edit" && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            This question must contain at least one choice in order to receive a
            response from survey takers.
          </Alert>
        )}
      {question.answerType === TYPES.MA &&
        parsedDescription.length < 2 &&
        mode === "edit" && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            This question must contain at least one criteria in order to receive
            a response from survey takers.
          </Alert>
        )}

      <Grid container spacing={5} columns={{ xs: 6, lg: 12 }}>
        <Grid item xs={6} className={classes.leftCol}>
          <Card>
            <SubHeading>
              {mode === "create" ? "Create" : "Edit"} Question
            </SubHeading>
            <form
              className={classes.form}
              onSubmit={handleSubmit(
                mode === "create" ? handleCreateQuestion : handleUpdateQuestion
              )}
            >
              <Input
                name="description"
                label="Question"
                control={control}
                placeholder="Enter a question"
                fullWidth
                multiline
                minRows={3}
              />
              <Stack
                justifyContent="space-between"
                direction="row"
                gap={1}
                alignItems="center"
              >
                <AutoComplete
                  options={answerTypes}
                  name="answerType"
                  label="Answer Type"
                  fullWidth
                  control={control}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
                {watch("answerType") && (
                  <Tooltip title={getAnswerTypeTooltipText()}>
                    <IconButton variant="contained" sx={infoButtonStyles}>
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
              {writtenTypes.includes(watch("answerType")?.value) && (
                <Input
                  name="charLimit"
                  label="Character Limit"
                  control={control}
                  placeholder="Enter the maximum number of characters allowed"
                  fullWidth
                  type="number"
                  inputProps={{ min: 1 }}
                />
              )}

              <Stack direction="row">
                <CheckBox control={control} name="required" label="Required" />
                <Tooltip
                  title="Enabling this setting will require the survey taker to provide a response to this question."
                  placement="right-start"
                >
                  <IconButton variant="contained" sx={infoButtonStyles}>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Button variant="contained" type="submit">
                {mode === "create" ? "Create" : "Save"}
              </Button>
              {mode !== "create" && (
                <Button
                  onClick={() => handleDeleteQuestion(questionId)}
                  variant="contained"
                  sx={{ ml: 2 }}
                  className={classes.deleteButton}
                >
                  Delete
                </Button>
              )}
            </form>
          </Card>
          {mode === "edit" && (
            <>
              {choiceCompatibleTypes.includes(question.answerType) && (
                <ManageChoices
                  choices={choices}
                  fetchChoices={fetchChoices}
                  question={question}
                />
              )}
            </>
          )}
        </Grid>
        {mode === "edit" && (
          <Grid item xs={6}>
            <Stack spacing={4}>
              <Card>
                <SubHeading>Question Preview</SubHeading>
                <QuestionPreview
                  choices={choices}
                  question={question}
                  questionLoading={questionLoading}
                />
              </Card>
              {question.answerType === TYPES.MA && (
                <ManageCategories
                  parsedDescription={parsedDescription}
                  question={question}
                  fetchQuestion={fetchQuestion}
                />
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ManageQuestion;
