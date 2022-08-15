import { createTheme } from "@mui/material/styles";
import colors from "./config/colors";

export const drawerWidth = 240;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      light: "#296CF6",
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

export default theme;
