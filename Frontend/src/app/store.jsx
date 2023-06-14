import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Products/productSlice";
import authReducer from "../Features/auth/authSlice";
import brandReducer from "../Features/Brand/BrandSlice";
import cartReducer from "../Features/cartSlice/cartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    Brand: brandReducer,
    cart: cartReducer,
  },
});

export default store;
