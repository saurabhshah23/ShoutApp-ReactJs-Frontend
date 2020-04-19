import {
  SET_SHOUTS,
  LIKE_SHOUT,
  LOADING_DATA,
  UNLIKE_SHOUT,
  DELETE_SHOUT,
  POST_SHOUT,
  SET_SHOUT,
} from "../types";

const initialState = {
  shouts: [],
  shout: {
    comments: [],
  },
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        isLoading: true,
      };

    case SET_SHOUTS:
      return {
        ...state,
        isLoading: false,
        shouts: action.payload,
      };

    case LIKE_SHOUT:
    case UNLIKE_SHOUT:
      let index = state.shouts.findIndex(
        (like) => like.shoutId === action.payload.shoutId
      );
      state.shouts[index] = action.payload;
      if (state.shout.shoutId === action.payload.shoutId)
        state.shout = action.payload;
      return {
        ...state,
      };

    case DELETE_SHOUT:
      return {
        ...state,
        shouts: state.shouts.filter(
          (shout) => shout.shoutId !== action.payload
        ),
      };

    case POST_SHOUT:
      return {
        ...state,
        shouts: [action.payload, ...state.shouts],
      };

    case SET_SHOUT:
      return {
        ...state,
        shout: action.payload,
      };

    default:
      return state;
  }
}
