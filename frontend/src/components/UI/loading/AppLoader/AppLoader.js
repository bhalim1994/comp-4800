import { HashLoader } from "react-spinners";
import useTheme from "@mui/material/styles/useTheme";
import { Box } from "@mui/material";
import classes from "./AppLoader.module.css";

const AppLoader = ({ centerInParent = true }) => {
  const theme = useTheme();

  return (
    <Box className={centerInParent ? classes.centerInParent : classes.root}>
      <HashLoader color={theme?.palette?.primary?.main} />
    </Box>
  );
};

export default AppLoader;
