import classes from "../ManageChoices/ManageChoices.module.css";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryControls = ({
  row,
  index,
  editMode,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) => (
  <TableCell align="right" sx={{ width: 300 }}>
    {editMode ? (
      <>
        <Tooltip title="Cancel">
          <IconButton
            variant="contained"
            sx={{ ml: 2 }}
            onClick={onCancel}
            className={classes.undoButton}
          >
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton
            variant="contained"
            sx={{ ml: 2 }}
            onClick={onSave}
            className={classes.saveButton}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </>
    ) : (
      <>
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => onEdit(row, index)}
            className={classes.editButton}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            variant="contained"
            onClick={() => onDelete(index)}
            sx={{ ml: 2 }}
            className={classes.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    )}
  </TableCell>
);

export default CategoryControls;
