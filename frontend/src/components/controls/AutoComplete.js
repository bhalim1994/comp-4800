import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const AutoComplete = ({
  control,
  name,
  rules,
  options,
  label,
  getOptionLabel,
  ...rest
}) => {
  return (
    <Controller
      render={({
        field: { onChange, value },
        fieldState,
        formState,
        ...props
      }) => (
        <Autocomplete
          {...props}
          {...rest}
          disablePortal
          getOptionLabel={getOptionLabel}
          onChange={(e, data) => onChange(data)}
          value={value}
          options={options}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={label} />
          )}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
};

export default AutoComplete;
