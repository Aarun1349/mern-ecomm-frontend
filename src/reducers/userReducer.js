import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CLEAR_ERRORS,
} from "../constants/userConstants";
const initialState = {
  user:{}
}
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        loading: true,
        isAuthenticatted: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticatted: true,
        user: action.payload.user,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        isAuthenticatted: false,
        user: null,
        error: action.payload,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        loading: false,
        isAuthenticatted: false,
        error: null,
      };
    }
    default:{
      return {
        ...state,
        loading: false,
        isAuthenticatted: false,
        error: null,
      };
    }
  }
};
