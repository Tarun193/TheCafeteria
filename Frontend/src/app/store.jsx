import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Products/productSlice";
import authReducer from "../Features/auth/authSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
