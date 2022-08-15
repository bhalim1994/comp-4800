import { Typography } from "@mui/material";

const SubHeading = ({ children, ...rest }) => {
  return (
    <Typography variant="h5" gutterBottom sx={{ mb: 4 }} {...rest}>
      {children}
    </Typography>
  );
};

export default SubHeading;
