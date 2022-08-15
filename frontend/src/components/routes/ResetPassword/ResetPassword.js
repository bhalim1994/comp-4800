import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosGet from "../../../hooks/useAxiosGet";
import classes from "../Login/Login.module.css";
import AppLoader from "../../UI/loading/AppLoader/AppLoader";
import { Typography } from "@mui/material";
import Button from "../../UI/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import rp from "../../routing/routePaths";
import { resetPassword } from "../../../services/api/passwordResetAxios";

const ResetPassword = () => {
  const { passwordResetId } = useParams();
  const navigate = useNavigate();
  const { response, isLoading, error } = useAxiosGet(
    `/passwordResets/${passwordResetId}`
  );

  const resetHandler = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (password !== password2) return toast.error("Passwords do not match!");

    try {
      await resetPassword(passwordResetId, password);
      toast.success("Your password was reset successfully!");
      navigate(rp.login);
    } catch {}
  };

  if (isLoading) return <AppLoader />;
  return (
    <Box className={classes.root}>
      <Box className={classes.loginContainer}>
        <div className={classes.bcitLogo}>BCIT</div>
        {error ? (
          <Typography>Invalid link!</Typography>
        ) : response.completed ? (
          <Typography>This link has been used already!</Typography>
        ) : new Date(response.expiresAt) < new Date() ? (
          <Typography>This link has expired!</Typography>
        ) : (
          <form onSubmit={resetHandler}>
            <TextField
              required
              type="password"
              label="Password"
              variant="outlined"
              name="password"
            />
            <TextField
              required
              type="password"
              label="Confirm Password"
              variant="outlined"
              name="password2"
            />
            <Button type="submit">Reset Password</Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ResetPassword;
