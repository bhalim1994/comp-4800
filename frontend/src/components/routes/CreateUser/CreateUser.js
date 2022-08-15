import React from "react";
import { Alert, Box, Button } from "@mui/material";
import Heading from "../../UI/typography/Heading";
import classes from "./CreateUser.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../../controls/Input";
import { createUser } from "../../../services/api/userAxios";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPass: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPass: "",
};

const CreateUser = ({ closeModal, refetchUsers }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleCreateUser = async (data) => {
    try {
      await createUser(data);
      reset(defaultValues);
      closeModal();
      refetchUsers(false);
    } catch {}
  };

  return (
    <Box className={classes.root}>
      <Heading>Create User</Heading>
      <form onSubmit={handleSubmit(handleCreateUser)} className={classes.form}>
        <Input
          name="firstName"
          label="First Name"
          control={control}
          required
          fullWidth
        />
        <Input
          name="lastName"
          label="Last Name"
          control={control}
          required
          fullWidth
        />
        <Input
          name="email"
          label="Email Address"
          type="email"
          control={control}
          helperText="name@gmail.com"
          required
          fullWidth
        />
        <Input
          name="password"
          label="Password"
          type="password"
          control={control}
          required
          fullWidth
        />
        <Input
          name="confirmPass"
          label="Confirm Password"
          type="password"
          control={control}
          required
          fullWidth
        />
        {errors.confirmPass && (
          <Alert severity="error">{errors.confirmPass.message}</Alert>
        )}
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateUser;
