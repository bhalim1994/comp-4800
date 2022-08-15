import { Box, Container, Toolbar } from "@mui/material";
import { useState } from "react";
import AccountSideBar from "../../UI/navigation/AccountSideBar/AccountSideBar";
import Breadcrumbs from "../../UI/navigation/Breadcrumbs/Breadcrumbs";
import classes from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import TopAppBar from "../../UI/navigation/TopAppBar/TopAppBar";

const MainLayout = () => {
  const [accountSideBarOpen, setAccountSideBarOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopAppBar setAccountSideBarOpen={setAccountSideBarOpen} />
      <AccountSideBar
        accountSideBarOpen={accountSideBarOpen}
        setAccountSideBarOpen={setAccountSideBarOpen}
      />

      <Box component="main" className={classes.contentContainer}>
        <Toolbar className={classes.toolbar} />
        <Container maxWidth="xl">
          <Breadcrumbs />
          <Outlet />
        </Container>
      </Box>
    </div>
  );
};

export default MainLayout;
