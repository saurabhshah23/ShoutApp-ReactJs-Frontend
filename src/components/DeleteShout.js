import React, { useState } from "react";
import PropTypes from "prop-types";
import MyIconButton from "../util/MyIconButton";
// MUI Stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
// Icons
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// Redux
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    position: "absolute",
    right: 20,
    top: "10%",
  },
}));

function DeleteShout({ shoutId }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Event handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteShout = () => {
    dispatch();
  };

  return (
    <>
      <MyIconButton
        tip="Delete shout"
        handleClick={handleOpen}
        btnClass={classes.deleteButton}
      >
        <DeleteOutlineIcon color="secondary" />
      </MyIconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this shout ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is an irreversible action. This shout will be permanantly
            deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteShout} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteShout.propTypes = {
  shoutId: PropTypes.string.isRequired,
};

export default DeleteShout;
