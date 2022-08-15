import { Typography } from "@mui/material";

const Heading = ({ children, ...rest }) => {
  return (
    <>
      <Typography variant="h4" mb={5} {...rest}>
        {children}
      </Typography>
    </>
  );
};

export default Heading;
