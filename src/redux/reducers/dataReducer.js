import {
  SET_SHOUTS,
  LIKE_SHOUT,
  LOADING_DATA,
  UNLIKE_SHOUT,
  DELETE_SHOUT,
} from "../types";

const initialState = {
  shouts: [],
  shout: {},
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

    default:
      return state;
  }
}
