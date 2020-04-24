import {
  SET_USER,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";

// signup new user
export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", userData)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log("userActions>signupUser: redirecting to home...");
      history.push("/");
    })
    .catch((err) => {
      console.log("err:", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// login user
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log("userActions>loginUser: redirecting to home...");
      history.push("/");
    })
    .catch((err) => {
      console.log("err:", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// logout action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// get Authenticated user's details.
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      console.log("logged user=", res.data);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      // TODO: SET_USER_ERRORS
    });
};

// upload profile picture
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/image", formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
      // TODO: SET_USER_ERRORS
    });
};

// Edit profile
export const editUserProfile = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
      // TODO: SET_USER_ERRORS
    });
};

export const markNotificationsRead = (arrNotificationIds) => (dispatch) => {
  axios
    .post("/notifications", arrNotificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// helpers
const setAuthorizationToken = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
