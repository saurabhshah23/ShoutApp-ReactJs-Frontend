import {
  LOADING_DATA,
  SET_SHOUTS,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  DELETE_SHOUT,
  LOADING_UI,
  POST_SHOUT,
  SET_SHOUT,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_COMMENT,
} from "../types";
import axios from "axios";

// Get all shouts
export const getShouts = () => (dispatch) => {
  console.log("dataActions > getShouts...");
  dispatch({ type: LOADING_DATA });
  axios
    .get("/shouts")
    .then((res) => {
      dispatch({
        type: SET_SHOUTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_SHOUTS,
        payload: [],
      });
    });
};

// Post a shout
export const postShout = (shoutData) => (dispatch) => {
  console.log("dataActions > postShout");
  dispatch({ type: LOADING_UI });
  axios
    .post("/shout", shoutData)
    .then((res) => {
      dispatch({
        type: POST_SHOUT,
        payload: res.data,
      });
      dispatch(resetUIErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get shout details
export const getShout = (shoutId) => (dispatch) => {
  console.log("dataActions > getShout");
  dispatch({ type: LOADING_UI });
  axios
    .get(`/shout/${shoutId}`)
    .then((res) => {
      dispatch({
        type: SET_SHOUT,
        payload: res.data, // Shout doc
      });
      dispatch(resetUIErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Like a shout
export const likeShout = (shoutId) => (dispatch) => {
  console.log("dataActions > likeShout");
  axios
    .get(`/shout/${shoutId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SHOUT,
        payload: res.data, //like document
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Unlike a shout
export const unlikeShout = (shoutId) => (dispatch) => {
  console.log("dataActions > unlikeShout");
  axios
    .get(`/shout/${shoutId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SHOUT,
        payload: res.data, //like document
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete a shout
export const deleteShout = (shoutId) => (dispatch) => {
  axios
    .delete(`/shout/${shoutId}`)
    .then((res) => {
      dispatch({ type: DELETE_SHOUT, payload: shoutId });
    })
    .catch((err) => console.log(err));
};

// Post a comment on a shout
export const postComment = (shoutId, commentData) => (dispatch) => {
  console.log("dataActions > postComment... commentData=", commentData);
  dispatch({ type: LOADING_UI });
  axios
    .post(`/shout/${shoutId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data,
      });
      dispatch(resetUIErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// util functions
// Clear UI errors
export const resetUIErrors = () => (dispatch) => {
  console.log("resetUIErrors...");
  dispatch({ type: CLEAR_ERRORS });
};
