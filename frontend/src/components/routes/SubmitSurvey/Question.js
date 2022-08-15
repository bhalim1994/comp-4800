import React from "react";
import Subtitle from "../../UI/typography/Subtitle";
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import classes from "./Question.module.css";

export const TYPES = {
  SS: "SingleSelect",
  MS: "MultiSelect",
  SA: "ShortAnswer",
  LA: "LongAnswer",
  MA: "Matrix",
};

const Question = ({
  question,
  choices,
  onChange,
  val,
  index,
  submissionQuestion,
  branches,
  onSubmissionChange,
  submission,
  questions,
}) => {
  const { answerType, questionId, description, required, charLimit } = question;

  const onShortOrLongAnswerChange = (e) => {
    onChange({
      questionId: questionId,
      value: e.target.value,
    });
  };

  const onMSLocalChange = (e, choiceId) => {
    const newVal = _getMSvalue(e.target.value);

    const choiceIds = submissionQuestion.choiceIdList;

    const updatedChoiceIdList = choiceIds.some((id) => id === choiceId)
      ? choiceIds.filter((id) => id !== choiceId)
      : [...choiceIds, choiceId];

    handleBranchResets(choiceId, updatedChoiceIdList);
    onChange({
      questionId: questionId,
      value: newVal,
      choiceIdList: updatedChoiceIdList,
    });
  };

  const _getMSvalue = (newValue) => {
    const exist = val.includes(newValue);

    if (exist) return val.filter((i) => i !== newValue);
    else return [...val, newValue];
  };

  // Reset the values of questions branched from choices other than the one just selected
  const handleBranchResets = (choiceId, choiceIds) => {
    let otherChoices;
    if (answerType === TYPES.MS) {
      otherChoices = question.choices.filter(
        (c) => !choiceIds.some((choiceId) => choiceId === c.choiceId)
      );
    } else {
      otherChoices = question.choices.filter((c) => c !== choiceId);
    }
    const parentBranchesToReset = getBranchesFromChoices(otherChoices);

    if (parentBranchesToReset.length > 0) {
      const submissionClone = submission.map((q) => ({ ...q }));
      recursivelyClearChildren(submissionClone, parentBranchesToReset);
      onSubmissionChange(submissionClone);
    }
  };

  const onChoiceChange = (e, choiceId) => {
    handleBranchResets(choiceId);
    onChange({
      questionId: questionId,
      value: e.target.value,
      choiceId: choiceId,
    });
  };

  const onMatrixChange = (e, index) => {
    if (!Array.isArray(val)) val = [];
    val[index] = e.target.value;

    onChange({
      questionId,
      value: val,
    });
  };

  const getBranchesFromChoices = (choices) => {
    return branches.filter((b) =>
      choices.some((choice) => choice.choiceId === b.choiceId)
    );
  };

  const recursivelyClearChildren = (submissionClone, branches) => {
    if (branches.length < 1) return;
    branches.forEach((b) => {
      const childQuestion = submissionClone.find(
        (q) => q.questionId === b.questionId
      );
      childQuestion.value = "";
      childQuestion.choiceId = undefined;
      childQuestion.choiceIdList =
        childQuestion.answerType === TYPES.MS ? [] : undefined;
      const dbQuestion = questions.find(
        (q) => q.questionId === childQuestion.questionId
      );
      if (dbQuestion.choices) {
        const branches = getBranchesFromChoices(dbQuestion.choices);
        recursivelyClearChildren(submissionClone, branches);
      }
    });
  };

  const render = () => {
    switch (answerType) {
      case TYPES.SS: {
        return (
          <RadioGroup value={val}>
            {choices.map(({ value, choiceId }) => (
              <FormControlLabel
                onChange={(e) => onChoiceChange(e, choiceId)}
                key={choiceId}
                label={value}
                value={value}
                control={<Radio required={required} />}
              />
            ))}
          </RadioGroup>
        );
      }
      case TYPES.MS: {
        return (
          <FormGroup>
            {choices.map(({ value, choiceId }) => (
              <FormControlLabel
                onChange={(e) => onMSLocalChange(e, choiceId)}
                key={choiceId}
                label={value}
                value={value}
                control={
                  <Checkbox
                    size="medium"
                    checked={
                      submissionQuestion?.choiceIdList?.some(
                        (id) => id === choiceId
                      ) ?? false
                    }
                  />
                }
              />
            ))}
          </FormGroup>
        );
      }
      case TYPES.SA: {
        return (
          <TextField
            variant="outlined"
            placeholder="Enter answer here"
            label="Answer"
            onChange={onShortOrLongAnswerChange}
            value={val}
            fullWidth
            required={required}
            inputProps={{ maxLength: charLimit }}
          />
        );
      }
      case TYPES.LA: {
        return (
          <TextField
            variant="outlined"
            placeholder="Enter answer here"
            label="Answer"
            onChange={onShortOrLongAnswerChange}
            value={val}
            fullWidth
            multiline
            required={required}
            minRows={4}
            inputProps={{ maxLength: charLimit }}
          />
        );
      }
      case TYPES.MA: {
        return (
          <div
            className={classes.matrix}
            style={{
              gridTemplateColumns: `repeat(${choices.length + 1}, 1fr)`,
            }}
          >
            <div />

            {choices.map(({ value }) => (
              <div key={value}>{value}</div>
            ))}
            {JSON.parse(description).map(
              (v, i) =>
                i !== 0 && (
                  <React.Fragment key={i}>
                    <div>{v}</div>

                    <RadioGroup
                      className={classes.radioGroup}
                      value={val[i - 1]}
                    >
                      {choices.map(({ value, choiceId }) => (
                        <FormControlLabel
                          onChange={(e) => onMatrixChange(e, i - 1)}
                          key={choiceId}
                          value={value}
                          label=""
                          control={<Radio required={required} />}
                        />
                      ))}
                    </RadioGroup>
                  </React.Fragment>
                )
            )}
          </div>
        );
      }
      default:
        break;
    }
  };

  return (
    <Card sx={{ p: 3, mb: 2, borderRadius: 2.5 }} variant="outlined">
      <Subtitle sx={{ marginTop: "0.5rem !important" }}>
        {index + 1}.{" "}
        {answerType === TYPES.MA ? JSON.parse(description)[0] : description}{" "}
        {required && (
          <Tooltip title="This question requires a response." placement="right">
            <Box display="inline" color="red">
              *
            </Box>
          </Tooltip>
        )}
      </Subtitle>
      {(answerType === TYPES.SA || answerType === TYPES.LA) && (
        <Box mb={2} mt={-2} ml={1}>
          <Typography variant="caption">
            Characters remaining: {charLimit - val?.length}
          </Typography>
        </Box>
      )}
      {render()}
    </Card>
  );
};

export default Question;
