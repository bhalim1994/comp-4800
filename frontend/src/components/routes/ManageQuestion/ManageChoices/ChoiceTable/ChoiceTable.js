import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ChoiceControls from "../ChoiceControls/ChoiceControls";
import classes from "../ManageChoices.module.css";
import Subtitle from "../../../../UI/typography/Subtitle";
import {
  deleteChoice,
  updateChoice,
  updateChoices,
} from "../../../../../services/api/choiceAxios";
import { useState, useEffect } from "react";
import SidedrawerModal from "../../../../UI/SidedrawerModal/SidedrawerModal";
import useAxiosGet from "../../../../../hooks/useAxiosGet";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Close from "@mui/icons-material/Close";
import {
  createQuestionBranch,
  deleteQuestionBranch,
} from "../../../../../services/api/questionBranchAxios";
import { TYPES } from "../../../SubmitSurvey/Question";

const columns = [
  { field: "drag", title: "Drag" },
  { field: "value", title: "Value" },
  { field: "linkedQuestions", title: "Linked Questions" },
  { field: "manage", title: "Manage" },
];

const DEFAULT_LINK_QUESTION_STATE = { show: false, choiceId: "" };

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TableHeader = (props) => {
  const { columns, isNotMatrix } = props;
  const cols = isNotMatrix
    ? columns
    : columns.filter(({ field }) => field !== "linkedQuestions");
  return (
    <TableHead>
      <TableRow>
        {cols.map((column) => (
          <TableCell
            key={column.field}
            align={column.field === "manage" ? "right" : "left"}
          >
            <Typography variant="body1">
              <strong>{column.title}</strong>
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const ChoiceTable = ({ choices, fetchChoices, question }) => {
  const { surveyId, questionId } = useParams();
  const { response: questions } = useAxiosGet(
    `/questions?surveyId=${surveyId}`
  );
  const { response: allLinkedQuestions, fetchData } =
    useAxiosGet("/questionBranches");
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [currentChoice, setCurrentChoice] = useState();
  const [linkQuestionModalState, setLinkQuestionModalState] = useState(
    DEFAULT_LINK_QUESTION_STATE
  );
  const [linkedQuestions, setLinkedQuestions] = useState([]);
  const [linkableQuestions, setLinkableQuestions] = useState([]);

  useEffect(() => {
    setLinkedQuestions(
      allLinkedQuestions.filter(
        ({ choiceId }) => choiceId === linkQuestionModalState.choiceId
      )
    );

    setLinkableQuestions(
      questions
        .filter((q) => q.questionId !== questionId)
        .filter(
          (q) =>
            !allLinkedQuestions.find(
              (lq) =>
                lq.questionId === q.questionId ||
                (lq.choice.questionId === q.questionId &&
                  lq.questionId === questionId)
            )
        )
    );
  }, [
    allLinkedQuestions,
    linkQuestionModalState.choiceId,
    questions,
    questionId,
  ]);

  const onChange = (event) => {
    setCurrentChoice({
      ...currentChoice,
      [event.target.name]: event.target.value,
    });
  };
  const onEdit = (choice) => {
    setInEditMode({
      status: true,
      rowKey: choice.choiceId,
    });
    setCurrentChoice(choice);
  };

  const onSave = async () => {
    await updateChoice(currentChoice.choiceId, currentChoice);
    await fetchChoices();
    onCancel();
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setCurrentChoice(null);
  };

  const onDelete = async (choice) => {
    await deleteChoice(choice.choiceId);
    await fetchChoices();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedChoices = reorder(
      choices,
      result.source.index,
      result.destination.index
    );

    reorderedChoices.forEach((c, index) => {
      c.order = index;
    });

    await updateChoices(choices);
    await fetchChoices();
  };

  const onLink = (choiceId) => {
    setLinkQuestionModalState({ show: true, choiceId });
  };

  const onCloseLinkQuestionModal = () => {
    setLinkQuestionModalState(DEFAULT_LINK_QUESTION_STATE);
  };

  const addLQ = async (newArr) => {
    await createQuestionBranch(
      linkQuestionModalState.choiceId,
      newArr[0].questionId
    );
    await fetchData(false);
  };

  const removeLQ = async (choiceId, questionId) => {
    await deleteQuestionBranch(choiceId, questionId);
    await fetchData(false);
  };

  const _getQuestionById = (id) => {
    return questions.find(({ questionId }) => questionId === id);
  };

  const _getNumberOflinkedQuestions = (id) => {
    return allLinkedQuestions.filter(({ choiceId }) => choiceId === id).length;
  };

  const isNotMatrix = question.answerType !== TYPES.MA;

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table className={classes.table}>
          <TableHeader columns={columns} isNotMatrix={isNotMatrix} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="choices">
              {(provided) => {
                return (
                  <TableBody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {choices?.map((row, index) => {
                      const editMode =
                        inEditMode.status && inEditMode.rowKey === row.choiceId;
                      return (
                        <Draggable
                          key={row.choiceId}
                          draggableId={row.choiceId}
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
                              <TableCell align="left" sx={{ width: 100 }}>
                                <span {...provided.dragHandleProps}>
                                  <DragIndicatorIcon />
                                </span>
                              </TableCell>

                              <TableCell align="left" sx={{ width: 400 }}>
                                {editMode ? (
                                  <TextField
                                    name="value"
                                    value={currentChoice.value}
                                    size="small"
                                    onChange={onChange}
                                  />
                                ) : (
                                  <Subtitle className={classes.subtitle}>
                                    {row.value}
                                  </Subtitle>
                                )}
                              </TableCell>
                              {isNotMatrix && (
                                <TableCell align="left" sx={{ width: 50 }}>
                                  <span
                                    className={classes.numberOflinkedQuestions}
                                  >
                                    {_getNumberOflinkedQuestions(row.choiceId)}
                                  </span>
                                </TableCell>
                              )}
                              <ChoiceControls
                                row={row}
                                isNotMatrix={isNotMatrix}
                                editMode={editMode}
                                onSave={onSave}
                                onCancel={onCancel}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onLink={onLink}
                              />
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

      {/* Question Linking Model */}
      <SidedrawerModal
        show={linkQuestionModalState.show}
        closeModal={onCloseLinkQuestionModal}
        width="25vw"
      >
        <p>
          <b>NOTE: </b>Linking questions to a choice will hide those questions
          from the survey taker. The linked question will get revealed once the
          survey taker chooses the linked choice.
        </p>

        <p>
          <b>NOTE: </b>Linkable questions are those that belong to this survey,
          except this question, questions that are already linked to other
          choices, and the question that reveals this question.
        </p>

        <label htmlFor="lq">Questions Linked to this Choice:</label>
        <div id="lq" className={classes.linkedQuestions}>
          {linkedQuestions.length === 0 ? (
            <div className={classes.noLinkedQuestionMsg}>
              No Questions have been linked yet!
            </div>
          ) : (
            linkedQuestions.map(({ choiceId, questionId }, i) => {
              const { order, description, answerType } =
                _getQuestionById(questionId);
              return (
                <div key={i}>
                  {order + 1}.{" "}
                  {answerType === "Matrix"
                    ? JSON.parse(description)[0]
                    : description}
                  <Close
                    onClick={() => removeLQ(choiceId, questionId)}
                    sx={{ cursor: "pointer" }}
                  />
                </div>
              );
            })
          )}
        </div>

        <label htmlFor="Link Questions">Linkable Questions:</label>
        <Select
          id="Link Questions"
          options={linkableQuestions}
          isMulti
          value={[]}
          onChange={addLQ}
          getOptionLabel={({ order, description, answerType }) =>
            `${order + 1}. ${
              answerType === "Matrix" ? JSON.parse(description)[0] : description
            }`
          }
          getOptionValue={(q) => q.questionId}
          noOptionsMessage={() => "No Questions Available!"}
          hideSelectedOptions
          closeMenuOnSelect={false}
          controlShouldRenderValue={false}
          components={{
            ClearIndicator: () => null,
          }}
        />
      </SidedrawerModal>
    </>
  );
};

export default ChoiceTable;
