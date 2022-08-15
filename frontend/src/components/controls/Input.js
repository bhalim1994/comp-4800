import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({ control, name, rules, ...rest }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          required
          type="standard"
          variant="outlined"
          size="medium"
          {...field}
          {...rest}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
};

export default Input;
