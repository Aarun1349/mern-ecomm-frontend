import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
} from "../constants/userConstants";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: data.error.message });
  }
};
