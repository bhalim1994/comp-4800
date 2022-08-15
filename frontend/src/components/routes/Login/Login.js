import React from "react";
import { Box, TextField } from "@mui/material";
import { useUser } from "../../../contexts/UserContext";
import { login } from "../../../services/api/userAxios";
import classes from "./Login.module.css";
import Button from "../../UI/Button";
import rp from "../../routing/routePaths";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const t = await login(email, password);
    setUser(t);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.loginContainer}>
        <div className={classes.bcitLogo}>BCIT</div>
        <form onSubmit={loginHandler}>
          <TextField
            required
            type="email"
            label="Email Address"
            variant="outlined"
            name="email"
          />
          <TextField
            required
            type="password"
            label="Password"
            variant="outlined"
            name="password"
          />
          <Button variant="contained" type="submit">
            LOGIN
          </Button>
          <Button
            sx={{ width: "fit-content", textTransform: "initial" }}
            variant="text"
            onClick={() => navigate(rp.forgotPassword)}
          >
            Forgot password?
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
