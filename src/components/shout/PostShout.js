import React, { useState, useEffect } from "react";
import MyIconButton from "../../util/MyIconButton";
import SubmitProgressBtn from "../../util/SubmitProgressBtn";
import makeStyles from "@material-ui/core/styles/makeStyles";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { postShout, resetUIErrors } from "../../redux/actions/dataActions";
import { DialogActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ...theme.forms,
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  submitButton: {
    margin: 0,
  },
}));

export default function PostShout() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const UI = useSelector((state) => state.UI);
  const newShout = { body: "" };
  const [shout, setShout] = useState(newShout);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // console.log("hc=", resetUIErrors);
    setOpen(false);
    // setShout(newShout);
    dispatch(resetUIErrors());
  };

  // Event handlers
  const handleChange = (event) => {
    setShout({
      ...shout,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("shout posted...");
    const shoutData = {
      body: shout.body,
    };
    dispatch(postShout(shoutData));
  };
  useEffect(() => {
    console.log("uE UI.isLoading=", UI.isLoading, "==errors=", UI.errors);
    if (!UI.isLoading && Object.keys(UI.errors).length === 0) {
      handleClose();
      setShout(newShout);
    }
  }, [UI.isLoading]);

  return (
    <div>
      <MyIconButton tip="Create shout" handleClick={handleOpen}>
        <AddIcon color="primary" />
      </MyIconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className={classes.root} disableTypography>
          <Typography variant="h6">Post a shout</Typography>
          {handleClose ? (
            <MyIconButton
              tip="Close"
              handleClick={handleClose}
              btnClass={classes.closeButton}
            >
              <CloseIcon />
            </MyIconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Shout!!"
              multiline
              rows="3"
              placeholder="Shout out loud..."
              error={UI.errors.body ? true : false}
              helperText={UI.errors.body}
              className={classes.textField}
              onChange={handleChange}
              value={shout.body}
              fullWidth
            />

            <DialogActions>
              <SubmitProgressBtn
                isLoading={UI.isLoading}
                btnClass={classes.submitButton}
              >
                Shout
              </SubmitProgressBtn>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
