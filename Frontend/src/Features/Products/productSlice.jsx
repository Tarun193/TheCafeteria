import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../utils/API/api";
import axios from "axios";

// Initial state of out Products.
const initialState = {
  products: [],
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await API.get("/products");
      return [...response.data];
    } catch (e) {
      console.log("Error is: ", e);
      throw e; // Add this line to rethrow the error
    }
  }
);

export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (data, thunkAPI) => {
    try {
      const response = await API.post("products/", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      thunkAPI.dispatch(fetchProducts());
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductsStatus = (state) => state.product.status;
export const selectProductsError = (state) => state.product.error;
export default productSlice.reducer;
