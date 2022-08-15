// import {
//   FormControlLabel,
//   Radio,
//   RadioGroup as MuiRadioGroup,
// } from "@mui/material";
// import React from "react";
// import { Controller } from "react-hook-form";

// const RadioGroup = ({ control, name, rules, choices, ...rest }) => {
//   return (
//     <Controller
//       render={({ field }) => (
//         <MuiRadioGroup {...rest} {...field} value={field.value}>
//           {choices?.map(({ value }) => (
//             <FormControlLabel key={value} label={value} control={<Radio />} />
//           ))}
//         </MuiRadioGroup>
//       )}
//       rules={rules}
//       name={name}
//       control={control}
//     />
//   );
// };

// export default RadioGroup;
