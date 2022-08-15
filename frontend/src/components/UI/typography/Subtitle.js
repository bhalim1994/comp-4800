import { Typography } from "@mui/material";
import classes from "./Subtitle.module.css";

const Subtitle = ({ children, className, ...rest }) => {
  return (
    <Typography
      variant="subtitle1"
      {...rest}
      className={`${classes.root} ${className}`}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
