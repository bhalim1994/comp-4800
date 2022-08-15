import React from "react";
import { Card as MuiCard } from "@mui/material";
import classes from "./Card.module.css";

const Card = ({ children }) => {
  return (
    <MuiCard className={classes.card} variant="outlined">
      {children}
    </MuiCard>
  );
};

export default Card;
