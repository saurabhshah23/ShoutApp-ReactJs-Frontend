import {
  LOADING_DATA,
  SET_SHOUTS,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  DELETE_SHOUT,
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
