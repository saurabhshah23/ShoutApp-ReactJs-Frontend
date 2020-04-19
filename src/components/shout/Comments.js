import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  ...theme.common,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
}));

const Comments = ({ comments }) => {
  const classes = useStyles();
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userHandle, userImage, id } = comment;
        return (
          <Fragment key={id}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="Commenter"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      @{userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeperator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
