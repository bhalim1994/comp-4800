import { OBJECT_WILD_CARD_KEY } from "../../../utils/helpers";
import { Button } from "@mui/material";
import classes from "./ManageSurvey.module.css";

export const QUESTIONS_UNIQUE_ID = "questionId";

export const QUESTION_HEADERS = (handleEdit, handleDelete) => [
  {
    name: "#",
    source: "order",
    bold: true,
    formatter: (val) => val + 1,
  },
  {
    name: "Question",
    source: "description",
    bold: true,
  },
  {
    name: "Answer Type",
    source: "answerType",
    bold: true,
  },
  {
    name: "",
    source: QUESTIONS_UNIQUE_ID,
    formatter: (questionId) => (
      <Button onClick={() => handleEdit(questionId)} variant="contained">
        Edit
      </Button>
    ),
  },
  {
    name: "",
    source: OBJECT_WILD_CARD_KEY,
    formatter: (val) => (
      <Button
        onClick={() => handleDelete(val)}
        variant="contained"
        className={classes.deleteButton}
      >
        Delete
      </Button>
    ),
  },
];
