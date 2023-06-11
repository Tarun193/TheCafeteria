import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Products/productSlice";
import authReducer from "../Features/auth/authSlice";
import brandReducer from "../Features/Brand/BrandSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    Brand: brandReducer,
  },
});

export default store;
