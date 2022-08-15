import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import rp from "../../../routing/routePaths";
import { useUser } from "../../../../contexts/UserContext";
import classes from "./AccountSideBar.module.css";

const AccountSideBar = (props) => {
  const { accountSideBarOpen, setAccountSideBarOpen } = props;
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const sideBarContent = (
    <List className={classes.sideBarContent}>
      <ListItem>
        <ListItemText>
          {user.firstName} {user.lastName}
        </ListItemText>
      </ListItem>

      <ListItem button onClick={() => navigate(rp.default)}>
        <ListItemIcon>
          <PollIcon className={classes.navIcon} />
        </ListItemIcon>
        <ListItemText>Surveys</ListItemText>
      </ListItem>

      <ListItem button onClick={() => navigate(rp.manageUsers)}>
        <ListItemIcon>
          <GroupIcon className={classes.navIcon} />
        </ListItemIcon>
        <ListItemText>Users</ListItemText>
      </ListItem>

      <ListItem button onClick={logout}>
        <ListItemIcon>
          <LogoutIcon className={classes.navIcon} />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </ListItem>
    </List>
  );

  return (
    <Box component="nav" className={classes.drawer}>
      <SwipeableDrawer
        anchor="left"
        open={accountSideBarOpen}
        classes={{ paper: classes.drawerPaper }}
        className={classes.swipeableSidebar}
        variant="temporary"
        onClose={() => setAccountSideBarOpen(false)}
        onOpen={() => setAccountSideBarOpen(true)}
        ModalProps={{ keepMounted: true }}
      >
        {sideBarContent}
      </SwipeableDrawer>
      <Drawer
        anchor="left"
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        className={classes.sidebar}
      >
        {sideBarContent}
      </Drawer>
    </Box>
  );
};

export default AccountSideBar;
