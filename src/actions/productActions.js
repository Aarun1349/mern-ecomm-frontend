import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
} from "../constants/productConstants";

// create an instance of axios with the API endpoint URL
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// get all products
export const getProducts =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      // const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}}`
      // console.log(price)
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      console.log("link", link);
      if (category) {
        console.log(category);
        // link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category} `;
        link = `/api/v1/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category} `;
        console.log("link", link);
      }
      // if (rating) {
      //   link = `/api/v1/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category} `;
      // }
      const { data } = await instance.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Get single product details by id
export const getProductById = (id) => async (dispatch) => {
  try {
    // console.log("ProductID",id.id)
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
    const { data } = await instance.get(`/api/v1/product/${id.id}`);
    // console.log("productDetails", data);
    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_PRODUCT_FAIL, payload: error });
  }
};
