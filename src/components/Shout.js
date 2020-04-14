import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyIconButton from "../util/MyIconButton";
import DeleteShout from "./DeleteShout";
// MUI stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { likeShout, unlikeShout } from "../redux/actions/dataActions";

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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // check if this shout is already liked by user
  const isShoutLiked = () => {
    if (user.likes && user.likes.find((like) => like.shoutId === shoutId))
      return true;
    else return false;
  };
  const handleLikeShout = () => {
    dispatch(likeShout(shoutId));
  };
  const handleUnlikeShout = () => {
    dispatch(unlikeShout(shoutId));
  };

  const likeButtonMarkup = !user.isAuthenticated ? (
    <>
      <MyIconButton tip="like">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </MyIconButton>
    </>
  ) : isShoutLiked() ? (
    <MyIconButton tip="Undo like" handleClick={handleUnlikeShout}>
      <FavoriteIcon color="primary" />
    </MyIconButton>
  ) : (
    <MyIconButton tip="Like" handleClick={handleLikeShout}>
      <FavoriteBorderIcon color="primary" />
    </MyIconButton>
  );

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
        {likeButtonMarkup}
        <span>{likeCount} likes</span>
        <MyIconButton tip="Add comment">
          <ChatIcon color="primary" />
        </MyIconButton>
        <span>{commentCount} comments</span>
      </CardContent>
    </Card>
  );
}

Shout.propTypes = {
  shout: PropTypes.object.isRequired,
};

export default Shout;
