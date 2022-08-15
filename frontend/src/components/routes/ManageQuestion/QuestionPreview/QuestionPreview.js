import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  TextField,
  RadioGroup,
} from "@mui/material";
import React, { useMemo } from "react";
import Subtitle from "../../../UI/typography/Subtitle";
import { TYPES } from "../../SubmitSurvey/Question";
import classes from "./QuestionPreview.module.css";

const QuestionPreview = ({
  question,
  choices,
  questionLoading = false,
  disabled,
  displayingAnswer,
}) => {
  const choicesPreview = useMemo(() => {
    switch (question.answerType) {
      case "SingleSelect": {
        return (
          <RadioGroup>
            {choices.map((choice) => (
              <FormControlLabel
                disabled={disabled}
                key={choice.choiceId}
                value={choice.value}
                control={<Radio />}
                label={choice.value}
              />
            ))}
          </RadioGroup>
        );
      }
      case "MultiSelect": {
        return (
          <FormGroup>
            {choices.map((choice) => (
              <FormControlLabel
                key={choice.choiceId}
                label={choice.value}
                disabled={disabled}
                control={<Checkbox value={choice.value} size="medium" />}
              />
            ))}
          </FormGroup>
        );
      }
      case "ShortAnswer": {
        return (
          <TextField
            variant="outlined"
            placeholder="Enter answer here"
            label="Answer"
            fullWidth
            disabled={disabled}
          />
        );
      }
      case "LongAnswer": {
        return (
          <TextField
            variant="outlined"
            placeholder="Enter answer here"
            label="Answer"
            fullWidth
            multiline
            minRows={4}
            disabled={disabled}
          />
        );
      }
      case "Matrix": {
        return (
          <div
            className={`${classes.matrix} ${disabled && classes.disabled}`}
            style={{
              gridTemplateColumns: `repeat(${choices.length + 1}, 1fr)`,
            }}
          >
            <div />

            {choices.map(({ value }) => (
              <div key={value}>{value}</div>
            ))}
            {JSON.parse(question.description).map(
              (v, i) =>
                i !== 0 && (
                  <React.Fragment key={i}>
                    <div>{v}</div>

                    <RadioGroup className={classes.radioGroup}>
                      {choices.map(({ value, choiceId }) => (
                        <FormControlLabel
                          key={choiceId}
                          value={value}
                          label=""
                          disabled={disabled}
                          control={<Radio />}
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
  }, [choices, question.answerType, disabled, question.description]);

  if (questionLoading) return null;

  return (
    <>
      <Subtitle>
        {question?.order + 1}.{" "}
        {question.answerType === TYPES.MA
          ? JSON.parse(question?.description)[0]
          : question?.description}
      </Subtitle>
      {choicesPreview}
    </>
  );
};

export default QuestionPreview;
