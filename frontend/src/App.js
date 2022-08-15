import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes";
import theme from "./theme";
import useColors from "./hooks/useColors";

const App = () => {
  useColors();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <UserProvider>
          <ToastContainer autoClose={2500} theme="colored" />
          <Routes />
        </UserProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
