import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./TopAppBar.module.css";

const TopAppBar = (props) => {
  const { setAccountSideBarOpen } = props;

  const handleOpenMenu = () => {
    setAccountSideBarOpen(true);
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleOpenMenu}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
