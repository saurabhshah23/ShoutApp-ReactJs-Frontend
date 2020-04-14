import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from "../types";

const initialState = {
  isLoading: false,
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: {},
      };

    case LOADING_UI:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
