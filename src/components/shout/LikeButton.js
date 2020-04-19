import React from "react";
import PropTypes from "prop-types";
import MyIconButton from "../../util/MyIconButton";
import { Link } from "react-router-dom";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// Redux
import { likeShout, unlikeShout } from "../../redux/actions/dataActions";
import { useSelector, useDispatch } from "react-redux";

const LikeButton = ({ shoutId }) => {
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
      <Link to="/login">
        <MyIconButton tip="like">
          <FavoriteBorderIcon color="primary" />
        </MyIconButton>
      </Link>
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

  return likeButtonMarkup;
};

LikeButton.propTypes = {
  shoutId: PropTypes.string.isRequired,
};

export default LikeButton;
