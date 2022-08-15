import React from "react";
import { Tabs as MuiTabs, Tab } from "@mui/material";
import colors from "../../../config/colors";
import classes from "./Tabs.module.css";

const Tabs = ({
  labels,
  onChange,
  value,
  margin = "0px",
  activeBarHeight = "3px",
  activeBarColor = colors.primary,
  className,
  ...otherProps
}) => (
  <MuiTabs
    value={value}
    className={`${classes.root} ${className}`}
    onChange={onChange}
    {...otherProps}
    classes={{ indicator: classes.indicator }}
    style={{
      "--tabs-margin": margin,
      "--tabs-bar-clr": activeBarColor,
      "--tabs-bar-height": activeBarHeight,
    }}
  >
    {labels.map((label) => (
      <Tab label={label} key={label} classes={{ selected: classes.selected }} />
    ))}
  </MuiTabs>
);

export default Tabs;
