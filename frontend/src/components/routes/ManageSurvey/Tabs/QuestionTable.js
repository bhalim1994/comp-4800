import {
  Alert,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useNavigate } from "react-router-dom";
import classes from "../ManageSurvey.module.css";
import {
  updateQuestions,
  deleteQuestion,
  duplicateQuestion,
} from "../../../../services/api/questionAxios";
import { dndReorder } from "../../../../utils/helpers";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import { infoButtonStyles } from "../../ManageQuestion/ManageQuestion";
import HelpIcon from "@mui/icons-material/Help";
import { TYPES } from "../../SubmitSurvey/Question";

const columns = [
  { field: "drag", title: "Drag", align: "left" },
  { field: "order", title: "#", align: "left" },
  { field: "description", title: "Question", align: "left" },
  { field: "answerType", title: "Answer Type", align: "left" },
  { field: "linkedQuestion", title: "Linked Parent Question", align: "left" },
  { field: "manage", title: "", align: "right" },
];

const TableHeader = (props) => {
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell key={column.field} align={column.align}>
            {column.field === "linkedQuestion" ? (
              <Tooltip title="A question with a Linked Parent Question is hidden by default. The Linked Parent Question contain a choice which can reveal the question if the choice is selected by the survey taker.">
                <Stack direction="row" alignItems="center">
                  <Typography variant="body1">
                    <strong>{column.title}</strong>
                  </Typography>

                  <IconButton variant="contained" sx={infoButtonStyles}>
                    <HelpIcon />
                  </IconButton>
                </Stack>
              </Tooltip>
            ) : (
              <Typography variant="body1">
                <strong>{column.title}</strong>
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const QuestionTable = ({
  surveyId,
  questions,
  fetchQuestions,
  hasSubmissions,
}) => {
  const { response: allLinkedQuestions } = useAxiosGet("/questionBranches");

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedQuestions = dndReorder(
      questions,
      result.source.index,
      result.destination.index
    );

    reorderedQuestions.forEach((question, index) => {
      question.order = index;
    });

    await updateQuestions(questions);
    await fetchQuestions();
  };

  const navigate = useNavigate();

  const handleEdit = (questionId) => {
    navigate(`/surveys/${surveyId}/questions/${questionId}`);
  };

  const handleDuplicate = async (questionId) => {
    await duplicateQuestion(questionId);
    await fetchQuestions();
  };

  const handleDelete = async (questionId) => {
    await deleteQuestion(questionId);
    await fetchQuestions();
  };

  const _isBranchedQuestion = (id) => {
    return allLinkedQuestions.some(({ questionId }) => questionId === id);
  };

  const _getParentQuestionByChildId = (childQuestionId) => {
    return allLinkedQuestions.find(
      ({ questionId }) => questionId === childQuestionId
    ).choice.question;
  };

  return (
    <TableContainer>
      {hasSubmissions && (
        <Alert severity="warning">
          This survey's questions are locked from further edits because one or
          more submissions have been made.
        </Alert>
      )}
      <Table>
        <TableHeader columns={columns} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => {
              return (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {questions?.map((row, index) => {
                    return (
                      <Draggable
                        key={row.questionId}
                        draggableId={row.questionId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            sx={
                              snapshot.isDragging
                                ? {
                                    backgroundColor: "#003c7159",
                                  }
                                : null
                            }
                          >
                            <TableCell align="left" sx={{ width: 70 }}>
                              <span {...provided.dragHandleProps}>
                                <DragIndicatorIcon />
                              </span>
                            </TableCell>

                            <TableCell align="left" sx={{ width: 70 }}>
                              <Typography>{row.order + 1}</Typography>
                            </TableCell>
                            <TableCell align="left" sx={{ width: 600 }}>
                              <Typography>
                                {row.answerType === TYPES.MA
                                  ? JSON.parse(row.description)[0]
                                  : row.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" sx={{ width: 190 }}>
                              <Typography>{row.answerType}</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ width: 240 }}>
                              {_isBranchedQuestion(row.questionId) ? (
                                <Tooltip
                                  title={`This question is linked to a choice in question #${
                                    _getParentQuestionByChildId(row.questionId)
                                      .order + 1
                                  }`}
                                >
                                  <div>
                                    Q
                                    {_getParentQuestionByChildId(row.questionId)
                                      .order + 1}
                                  </div>
                                </Tooltip>
                              ) : (
                                <Tooltip title="This question is unlinked">
                                  <span>-</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left" sx={{ width: 200 }}>
                              <Box display="flex" gap={2}>
                                <Tooltip title="Edit">
                                  <IconButton
                                    onClick={() => handleEdit(row.questionId)}
                                    className={classes.editButton}
                                    disabled={hasSubmissions}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Duplicate">
                                  <IconButton
                                    onClick={() =>
                                      handleDuplicate(row.questionId)
                                    }
                                    className={classes.duplicateButton}
                                    disabled={hasSubmissions}
                                  >
                                    <ContentCopyIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    onClick={() => handleDelete(row.questionId)}
                                    className={classes.deleteButton}
                                    disabled={hasSubmissions}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </TableBody>
              );
            }}
          </Droppable>
        </DragDropContext>
      </Table>
    </TableContainer>
  );
};

export default QuestionTable;
