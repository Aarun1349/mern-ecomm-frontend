import {
  configureStore,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer,productDetailsReducer } from "./reducers/productReducers";
const reducer = combineReducers({products: productsReducer,productDetails:productDetailsReducer });

let initialState = { cartItems: [] };

const middelware = [thunk];
const store = configureStore({
  reducer: reducer,
  initialState,
//   middleware:{...middelware}
  //   middleware:()=> composeWithDevTools(applyMiddleware(...middelware))}
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       composeWithDevTools(applyMiddleware(...middelware))
//     ),
});
// (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// const store = configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//     devTools: process.env.NODE_ENV !== 'production',
//     preloadedState,
//     enhancers: [batchedSubscribe(debounceNotify)],
//   })

export default store;
