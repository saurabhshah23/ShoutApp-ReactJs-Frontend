import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SubmitProgressBtn from "../../util/SubmitProgressBtn";
// MUI Stuff
import TextField from "@material-ui/core/TextField";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ...theme.common,
  ...theme.form,
}));

const CommentForm = ({ shoutId }) => {
  const classes = useStyles();

  const newComment = { body: "" };
  const [comment, setComment] = useState(newComment);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const commentData = {
      body: comment.body,
    };
    dispatch(postComment(shoutId, commentData));
  };

  const {
    user: { isAuthenticated },
    UI: { isLoading, errors },
  } = useSelector((state) => state);
  const handleChange = (event) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  // Empty the comment text field after successfull submit.
  useEffect(() => {
    // if (!isLoading && Object.keys(errors).length === 0) {
    if (!isLoading && !errors.comment) {
      setComment(newComment);
    }
    return () => {};
  }, [isLoading]);

  const commentFormMarkup = isAuthenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="comment on shout"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={comment.body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <SubmitProgressBtn isLoading={isLoading}>Post</SubmitProgressBtn>
      </form>
      <hr className={classes.visibleSeperator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  shoutId: PropTypes.string.isRequired,
};

export default CommentForm;
