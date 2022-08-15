import React, { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import Heading from "../../UI/typography/Heading";
import useAxiosGet from "../../../hooks/useAxiosGet";
import AppLoader from "../../UI/loading/AppLoader/AppLoader";
import { useNavigate } from "react-router-dom";
import {
  deleteSurvey,
  duplicateSurvey,
} from "../../../services/api/surveyAxios";
import SidedrawerModal from "../../UI/SidedrawerModal/SidedrawerModal";
import CreateSurvey from "../CreateSurvey/CreateSurvey";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEFAULT_RETURN_VALUE } from "../../../utils/helpers";
import classes from "./Surveys.module.css";
import Button from "../../UI/Button";
import rp from "../../routing/routePaths";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Status from "../../UI/Status/Status";

var savedSurveyId; // Variable to temporarily store surveyId from mapping and pass to dialog box to confirm deletion
var savedSurveyName; // Variable to temporarily store name from mapping and pass to dialog box to confirm deletion

const Surveys = () => {
  const {
    response: surveyList,
    isLoading,
    fetchData: fetchSurveys,
  } = useAxiosGet("/surveys");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const columns = [
    { field: "name", title: "Name" },
    { field: "type", title: "Type" },
    { field: "creator", title: "Creator" },
    { field: "created", title: "Created At" },
    { field: "updated", title: "Updated At" },
    { field: "status", title: "Status", center: true },
    { field: "buttons", title: "" },
  ];

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openDeleteDialog = () => setShowDeleteDialog(true);
  const closeDeleteDialog = () => setShowDeleteDialog(false);

  const TableHeader = (props) => {
    return (
      <TableHead>
        <TableRow>
          {props.columns.map((column) => (
            <TableCell
              key={column.field}
              align={column.center ? "center" : "inherit"}
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

  const formatDate = (inputDate) => {
    return moment(inputDate).format("MMM D YYYY, h:mm a");
  };

  const formatCreator = (user) => {
    if (!user) return DEFAULT_RETURN_VALUE;
    return user.firstName + " " + user.lastName;
  };

  const handleEditSurvey = (surveyId) => {
    navigate(rp.manageSurvey.replace(":surveyId", surveyId));
  };

  const handleDuplicate = async (surveyId) => {
    await duplicateSurvey(surveyId);
    await fetchSurveys();
  };

  const handleDeleteSurvey = async (surveyId) => {
    await deleteSurvey(surveyId);
    await fetchSurveys();
  };

  const saveSurveyInformation = (surveyId, name) => {
    savedSurveyId = surveyId;
    savedSurveyName = name;
  };

  if (isLoading) return <AppLoader />;

  return (
    <Box className={classes.root}>
      <Heading>Manage Surveys</Heading>
      <Box display="flex" justifyContent="flex-end">
        <Button
          icon="add"
          onClick={openCreateModal}
          variant="contained"
          color="primary"
        >
          Create Survey
        </Button>
      </Box>

      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {surveyList.map(
            ({ surveyId, name, type, user, createdAt, updatedAt, active }) => (
              <TableRow key={surveyId}>
                <TableCell>
                  <Typography>{name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{type}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{formatCreator(user)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{formatDate(createdAt)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{formatDate(updatedAt)}</Typography>
                </TableCell>
                <TableCell>
                  <Status
                    active={active}
                    tooltips={[
                      "Submissions can be made to this survey.",
                      "No submissions can be made to this survey.",
                    ]}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => handleEditSurvey(surveyId)}
                      variant="contained"
                      className={classes.editButton}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Duplicate">
                    <IconButton
                      onClick={() => handleDuplicate(surveyId)}
                      className={classes.duplicateButton}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={function () {
                        saveSurveyInformation(surveyId, name);
                        openDeleteDialog();
                      }}
                      variant="contained"
                      className={classes.deleteButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    open={showDeleteDialog}
                    BackdropProps={{
                      style: { opacity: 0.38 },
                    }}
                    PaperProps={{
                      style: {
                        padding: "0.8rem",
                        boxShadow: "1px 1px 10px 2px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                    onClose={closeDeleteDialog}
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description"
                  >
                    <DialogTitle id="delete-dialog-title">
                      {savedSurveyName}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="delete-dialog-description">
                        You are about to delete this survey and all of its data.
                        No one will be able to access this survey ever again.
                        <br />
                        <br />
                        <span className={classes.importantDialogText}>
                          Are you sure? This cannot be undone.
                        </span>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={function () {
                          handleDeleteSurvey(savedSurveyId);
                          closeDeleteDialog();
                        }}
                        variant="contained"
                        className={classes.confirmDelete}
                      >
                        Delete
                      </Button>
                      <Button onClick={closeDeleteDialog} variant="contained">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <SidedrawerModal show={showCreateModal} closeModal={closeCreateModal}>
        <CreateSurvey
          closeModal={closeCreateModal}
          refetchSurveys={fetchSurveys}
        />
      </SidedrawerModal>
    </Box>
  );
};

export default Surveys;
