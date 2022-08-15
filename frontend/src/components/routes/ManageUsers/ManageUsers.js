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
import Heading from "../../UI/typography/Heading";
import useAxiosGet from "../../../hooks/useAxiosGet";
import AppLoader from "../../UI/loading/AppLoader/AppLoader";
import { deleteUser } from "../../../services/api/userAxios";
import moment from "moment";
import SidedrawerModal from "../../UI/SidedrawerModal/SidedrawerModal";
import CreateUser from "../CreateUser/CreateUser";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./ManageUsers.module.css";
import Button from "../../UI/Button";
import { useUser } from "../../../contexts/UserContext";

var savedUserId; // Variable to temporarily store userId from mapping and pass to dialog box to confirm deletion
var savedUserFirstName; // Variable to temporarily store firstName from mapping and pass to dialog box to confirm deletion
var savedUserLastName; // Variable to temporarily store lastName from mapping and pass to dialog box to confirm deletion

const ManageUsers = () => {
  const {
    response: users,
    isLoading,
    fetchData: fetchUsers,
  } = useAxiosGet("/users");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const user = useUser();

  const columns = [
    { field: "name", title: "Name" },
    { field: "email", title: "Email" },
    { field: "created", title: "Created At" },
    { field: "updated", title: "Updated At" },
    { field: "delete", title: "" },
  ];

  const TableHeader = (props) => {
    return (
      <TableHead>
        <TableRow>
          {props.columns.map((column) => (
            <TableCell key={column.field}>
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

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openDeleteDialog = () => setShowDeleteDialog(true);
  const closeDeleteDialog = () => setShowDeleteDialog(false);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    await fetchUsers();
  };

  const saveUserInformation = (userId, firstName, lastName) => {
    savedUserId = userId;
    savedUserFirstName = firstName;
    savedUserLastName = lastName;
  };

  const shouldDisableDelete = (userId) =>
    userId === user.userId || users.length === 1;

  if (isLoading) return <AppLoader />;

  return (
    <Box className={classes.root}>
      <Heading>Manage Users</Heading>
      <Box display="flex" justifyContent="flex-end">
        <Button
          icon="add"
          onClick={openCreateModal}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create User
        </Button>
      </Box>

      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {users.map(
            ({ userId, firstName, lastName, email, createdAt, updatedAt }) => (
              <TableRow key={userId}>
                <TableCell>
                  <Typography>
                    {firstName} {lastName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{formatDate(createdAt)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{formatDate(updatedAt)}</Typography>
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      shouldDisableDelete(userId)
                        ? "You cannot delete the last user in the system or your own user."
                        : "Delete"
                    }
                  >
                    <span>
                      <IconButton
                        onClick={function () {
                          saveUserInformation(userId, firstName, lastName);
                          openDeleteDialog();
                        }}
                        variant="contained"
                        className={classes.deleteButton}
                        disabled={shouldDisableDelete(userId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </span>
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
                      {savedUserFirstName} {savedUserLastName}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="delete-dialog-description">
                        You are about to delete this user and all of their
                        administrator rights.
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
                          handleDeleteUser(savedUserId);
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
        <CreateUser closeModal={closeCreateModal} refetchUsers={fetchUsers} />
      </SidedrawerModal>
    </Box>
  );
};

export default ManageUsers;
