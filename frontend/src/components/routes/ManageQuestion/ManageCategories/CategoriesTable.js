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
import classes from "../ManageChoices/ManageChoices.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Subtitle from "../../../UI/typography/Subtitle";
import CategoryControls from "./CategoryControls";
import { updateQuestion } from "../../../../services/api/questionAxios";

const columns = [
  { field: "title", title: "Title" },
  { field: "manage", title: "Manage" },
];

const TableHeader = (props) => {
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
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

const DEFAULT_CATEGORY_STATE = { value: null, index: null };

const CategoriesTable = ({ parsedDescription, question, fetchQuestion }) => {
  const { questionId } = useParams();

  const [currentCategory, setCurrentCategory] = useState(
    DEFAULT_CATEGORY_STATE
  );

  const description = parsedDescription[0];
  const matrixCategories = parsedDescription.filter(
    (val, index) => index !== 0
  );

  const onChange = (event) => {
    setCurrentCategory({
      ...currentCategory,
      [event.target.name]: event.target.value,
    });
  };

  const onEdit = (value, index) => {
    setCurrentCategory({ value, index });
  };

  const onSave = async () => {
    const categoriesClone = [...matrixCategories];
    categoriesClone[currentCategory.index] = currentCategory.value;

    // Add main question title back to the description
    categoriesClone.unshift(description);

    await updateQuestion(questionId, {
      ...question,
      description: JSON.stringify(categoriesClone),
    });
    await fetchQuestion();
    onCancel();
  };

  const onCancel = () => {
    setCurrentCategory(DEFAULT_CATEGORY_STATE);
  };

  const onDelete = async (index) => {
    const categoriesClone = [...matrixCategories];
    categoriesClone.splice(index, 1);

    // Add main question title back to the description
    categoriesClone.unshift(description);

    await updateQuestion(questionId, {
      ...question,
      description: JSON.stringify(categoriesClone),
    });
    await fetchQuestion();
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table className={classes.table}>
          <TableHeader columns={columns} />
          <TableBody>
            {matrixCategories?.map((row, index) => {
              const editMode = currentCategory?.index === index;
              return (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ width: 400 }}>
                    {editMode ? (
                      <TextField
                        name="value"
                        value={currentCategory.value}
                        size="small"
                        onChange={onChange}
                      />
                    ) : (
                      <Subtitle className={classes.subtitle}>{row}</Subtitle>
                    )}
                  </TableCell>
                  <CategoryControls
                    row={row}
                    index={index}
                    editMode={editMode}
                    onSave={onSave}
                    onCancel={onCancel}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoriesTable;
