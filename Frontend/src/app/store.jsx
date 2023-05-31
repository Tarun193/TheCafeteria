import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Products/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
