import classes from "../ManageChoices.module.css";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLinkIcon from "@mui/icons-material/AddLink";

const ChoiceControls = ({
  row,
  isNotMatrix,
  editMode,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  onLink,
}) => (
  <TableCell align="right" sx={{ width: 300 }}>
    {isNotMatrix && (
      <Tooltip title="Link Question">
        <IconButton
          variant="contained"
          onClick={() => onLink(row.choiceId)}
          className={classes.linkButton}
        >
          <AddLinkIcon />
        </IconButton>
      </Tooltip>
    )}

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
            onClick={() => onEdit(row)}
            className={classes.editButton}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            variant="contained"
            onClick={() => onDelete(row)}
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

export default ChoiceControls;
