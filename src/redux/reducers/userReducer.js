import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  MARK_NOTIFICATIONS_READ,
} from "../types";

const initialState = {
  isAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        isLoading: false,
        isAuthenticated: true,
        ...action.payload,
      };

    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };

    case LIKE_SHOUT:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            shoutId: action.payload.shoutId,
            createdAt: "",
          },
        ],
      };

    case UNLIKE_SHOUT:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.shoutId !== action.payload.shoutId
        ),
      };

    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return {
        ...state,
      };

    default:
      return state;
  }
}
