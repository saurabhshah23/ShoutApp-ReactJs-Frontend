import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
// MUI Stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ...theme.forms,
}));

function SubmitProgressBtn({ children, isLoading, btnClass, btnColor }) {
  const classes = useStyles();
  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color={btnColor || "primary"}
        className={btnClass || classes.button}
        disabled={isLoading}
      >
        <Typography variant="body2">{children}</Typography>
        {/* <span>Login</span> */}
        {isLoading && (
          <CircularProgress size={20} className={classes.progress} />
        )}
      </Button>
    </div>
  );
}

SubmitProgressBtn.propTypes = {
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SubmitProgressBtn;
