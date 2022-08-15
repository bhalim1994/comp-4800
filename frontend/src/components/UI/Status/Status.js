import { Tooltip } from "@mui/material";
import React from "react";
import classes from "./Status.module.css";

const DEFAULT_STATUSES = ["Open", "Closed"];

const Status = ({
  active,
  statuses = DEFAULT_STATUSES,
  tooltips = ["", ""],
  className,
}) => {
  return (
    <Tooltip title={tooltips[active ? 0 : 1]}>
      <div
        className={`${classes.root} ${
          active ? classes.active : classes.inactive
        } ${className}`}
      >
        {statuses[active ? 0 : 1]}
      </div>
    </Tooltip>
  );
};

export default Status;
