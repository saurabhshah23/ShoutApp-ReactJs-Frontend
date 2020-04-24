import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyIconButton from "../../util/MyIconButton";
import DeleteShout from "./DeleteShout";
import ShoutDialog from "./ShoutDialog";
import LikeButton from "./LikeButton";
// MUI stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useSelector } from "react-redux";

const styles = makeStyles({
  card: {
    position: "relative",
    marginBottom: 20,
    display: "flex",
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
});

function Shout(props) {
  dayjs.extend(relativeTime);

  const classes = styles();

  const {
    userImage,
    body,
    shoutId,
    likeCount,
    commentCount,
    createdAt,
    userHandle,
  } = props.shout;

  const user = useSelector((state) => state.user);

  const deleteMarkup =
    user.isAuthenticated && userHandle === user.credentials.handle ? (
      <DeleteShout shoutId={shoutId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteMarkup}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton shoutId={shoutId} />
        <span>{likeCount} likes</span>
        <MyIconButton tip="Add comment">
          <ChatIcon color="primary" />
        </MyIconButton>
        <span>{commentCount} comments</span>
        <ShoutDialog
          shoutId={shoutId}
          userHandle={userHandle}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
}

Shout.propTypes = {
  shout: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

export default Shout;
