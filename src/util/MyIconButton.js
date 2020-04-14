import React from "react";
import PropTypes from "prop-types";
// MUI Stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

function MyIconButton({ children, tip, tipClass, handleClick, btnClass }) {
  return (
    <>
      <Tooltip title={tip} placement="top" className={tipClass}>
        <IconButton onClick={handleClick} className={btnClass}>
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
}

MyIconButton.propTypes = {
  tip: PropTypes.string.isRequired,
};

export default MyIconButton;
