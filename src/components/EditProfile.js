import React, { useState, useEffect, Fragment } from "react";
import MyIconButton from "../util/MyIconButton";
// Redux Stuff
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile } from "../redux/actions/userActions";
// MUI Stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  ...theme.forms,
  button: {
    float: "right",
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);

  // Dialog state
  const [open, setOpen] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({});
  /// TODO: Try credentials as dependency for below useEffect instead of redundant calls to set state.
  useEffect(() => {
    console.log("EditProfile > useEffect dep credentials...");
    mapProfileDetailsToState(credentials);
    return () => {
      //   cleanup
    };
  }, [credentials]);

  // Util functions
  const mapProfileDetailsToState = (credentials) => {
    setProfile({
      ...profile,
      bio: credentials.bio || "",
      website: credentials.website || "",
      location: credentials.location || "",
    });
  };

  // Event handlers
  const handleOpen = () => {
    setOpen(true);
    // mapProfileDetailsToState(credentials);   // not required. useEffect handles updates.
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    const userData = {
      bio: profile.bio,
      website: profile.website,
      location: profile.location,
    };
    dispatch(editUserProfile(userData));
    handleClose();
  };

  return (
    <Fragment>
      {/* <Tooltip title="Edit profile" placement="top">
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip> */}
      <MyIconButton
        tip="Edit profile"
        handleClick={handleOpen}
        btnClass={classes.button}
      >
        <EditIcon color="primary" />
      </MyIconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit profile"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="editProfile">Edit profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            multiline
            rows="3"
            placeholder="A short description about yourself"
            className={classes.textField}
            value={profile.bio}
            onChange={handleChange}
          />
          <TextField
            name="website"
            label="Website"
            type="text"
            fullWidth
            placeholder="Your personal/professional website"
            className={classes.textField}
            value={profile.website}
            onChange={handleChange}
          />
          <TextField
            name="location"
            label="Location"
            type="text"
            fullWidth
            placeholder="Where you live"
            className={classes.textField}
            value={profile.location}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditProfile;
