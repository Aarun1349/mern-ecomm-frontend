import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// get all products
export const getProducts = () => async (disaptch) => {
  try {
    disaptch({ type: ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/v1/products");
    disaptch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disaptch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear errors
export const clearErrors = () => async (disaptch) => {
  disaptch({ type: CLEAR_ERRORS });
};
