import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_FAIL,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST: {
      return { loading: true, products: [] };
    }
    case ALL_PRODUCTS_SUCCESS: {
      return {
        loading: false,
        products: action.payload.data,
        productsCount: action.payload.productCount,
        resPerPage: action.payload.resPerPage,
        productFilterdCount:action.payload.productFilterdCount
      };
    }
    case ALL_PRODUCTS_FAIL: {
      return { loading: false, products: [], error: action.payload };
    }
    case CLEAR_ERRORS: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { productDetails: {} }, action) => {
  switch (action.type) {
    case CLEAR_ERRORS: {
      return { ...state, error: null };
    }
    case GET_SINGLE_PRODUCT_REQUEST: {
      return {...state, loading: true };
    }
    case GET_SINGLE_PRODUCT_SUCCESS: {
      return { loading: false, productDetails: action.payload };
    }
    case GET_SINGLE_PRODUCT_FAIL: {
      return {...state, loading: false, error: action.payload.error };
    }
    default:
      return {...state,error:null};
  }
};
