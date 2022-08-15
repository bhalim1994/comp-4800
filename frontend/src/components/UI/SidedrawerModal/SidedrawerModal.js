import React from "react";
import Close from "@mui/icons-material/Close";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./SidedrawerModal.module.css";
import { useMediaQuery, useTheme } from "@mui/material";

const DEFAULT_WIDTH = "50vw";
const DEFAULT_MOBILE_WIDTH = "97vw";
const DEFAULT_PADDING = "27";

const SidedrawerModal = ({
  show,
  closeModal,
  children,
  hasCloseButton = true,
  width = DEFAULT_WIDTH,
  padding = DEFAULT_PADDING,
  styles,
}) => {
  const theme = useTheme();
  const fullWidth = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Backdrop show={show} clicked={closeModal} />
      <div
        className={`${classes.root} ${show && classes.show} `}
        style={{
          "--sidedrawer-modal-width": fullWidth ? DEFAULT_MOBILE_WIDTH : width,
          "--sidedrawer-modal-padding": `${padding}px`,
          ...styles,
        }}
      >
        {hasCloseButton && (
          <Close className={classes.closeIcon} onClick={closeModal} />
        )}
        {children}
      </div>
    </>
  );
};

export default SidedrawerModal;
