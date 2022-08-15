import { Box, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../controls/Input";
import rp from "../../routing/routePaths";
import Button from "../../UI/Button";
import classes from "../Login/Login.module.css";
import { createPasswordReset } from "../../../services/api/passwordResetAxios";

const defaultValues = {
  email: "",
};

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    const { email } = values;
    await createPasswordReset(email);
  };

  return (
    <Box className={classes.root}>
      <Box
        className={classes.loginContainer}
        sx={{ width: "450px !important" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Reset Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Please enter your email address. We will send you an email with a link
          to reset your password.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Check your spam folder if you don't receive an email in your primary
          inbox.
        </Typography>

        <form onSubmit={handleSubmit(handleResetPassword)}>
          <Input
            name="email"
            label="Email"
            type="email"
            control={control}
            required
            fullWidth
          />

          <Button variant="contained" type="submit" sx={{ mt: 1 }}>
            Send Email
          </Button>
          <Button
            sx={{ width: "fit-content", textTransform: "initial" }}
            variant="text"
            onClick={() => navigate(rp.login)}
          >
            Back to Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
