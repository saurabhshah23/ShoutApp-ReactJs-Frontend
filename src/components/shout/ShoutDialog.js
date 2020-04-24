import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyIconButton from "../../util/MyIconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// Icons
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getShout, resetUIErrors } from "../../redux/actions/dataActions";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ...theme.common,
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  expandButton: {
    position: "absolute",
    right: theme.spacing(1),
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  dialogContent: {
    padding: 20,
  },
}));

function ShoutDialog({ shoutId, userHandle, openDialog }) {
  const classes = useStyles();

  const [paths, setPaths] = useState({
    oldPath: "",
    newPath: "",
  });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    // change the browser url
    console.log("paths=", JSON.stringify(paths, 2, 4));
    window.history.pushState(null, null, paths.oldPath);
    setOpen(false);
    dispatch(resetUIErrors());
  };
  const handleOpen = () => {
    let oldPath = window.location.pathname,
      newPath = `/users/${userHandle}/shout/${shoutId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    setOpen(true);
    setPaths({ ...paths, oldPath, newPath });
    console.log("paths=", JSON.stringify(paths, 2, 4));
    dispatch(getShout(shoutId));
  };

  // See if any specific shout needs to be open
  useEffect(() => {
    if (openDialog) handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { UI, data } = useSelector((state) => state);

  const { shout } = data;
  const dialogMarkup = UI.isLoading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={4}>
      <Grid item sm={5}>
        <img
          src={shout.userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          variant="h5"
          color="primary"
          to={`/users/${shout.userHandle}`}
        >
          @{shout.userHandle}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(shout.createdAt).format("h:mm a, MMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{shout.body}</Typography>
        <LikeButton shoutId={shoutId} />
        <span>{shout.likeCount} likes</span>
        <MyIconButton tip="Add comment">
          <ChatIcon color="primary" />
        </MyIconButton>
        <span>{shout.commentCount} comments</span>
      </Grid>
      <CommentForm shoutId={shoutId} />
      {data.shout.comments && data.shout.comments.length > 0 && (
        <Comments comments={data.shout.comments} />
      )}
    </Grid>
  );

  return (
    <>
      <MyIconButton
        tip="Expand Shout"
        tipClass={classes.expandButton}
        handleClick={handleOpen}
      >
        <UnfoldMoreIcon color="primary" />
      </MyIconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {/* <DialogTitle className={classes.root} disableTypography>
          <Typography variant="h6">Post a shout</Typography>
        </DialogTitle> */}
        {handleClose ? (
          <MyIconButton
            tip="Close"
            handleClick={handleClose}
            btnClass={classes.closeButton}
          >
            <CloseIcon />
          </MyIconButton>
        ) : null}
        <DialogContent dividers className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}

ShoutDialog.propTypes = {
  shoutId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
};

export default ShoutDialog;
