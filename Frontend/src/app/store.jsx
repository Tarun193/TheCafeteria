import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/Products/productSlice";
import authReducer from "../Features/auth/authSlice";
import brandReducer from "../Features/Brand/BrandSlice";
import cartReducer from "../Features/cartSlice/cartSlice";
import addressReducer from "../Features/addressSlice/addressSlice";
import orderReducer from "../Features/orderSlice/orderSlice";
import searchSlice from "../Features/search";
const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    Brand: brandReducer,
    cart: cartReducer,
    Address: addressReducer,
    order: orderReducer,
    search: searchSlice,
  },
});

export default store;
