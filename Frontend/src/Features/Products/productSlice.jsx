import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

// Initial state of out Products.
const initialState = {
  products: [],
  status: "idle",
  error: "",
  processing: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await API.get("/products");
      return [...response.data];
    } catch (e) {
      throw e; // Add this line to rethrow the error
    }
  }
);

export const addProducts = createAsyncThunk(
  "products/addProducts",
  async ({ data, access }, thunkAPI) => {
    try {
      const response = await API.post("products/", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + access,
        },
      });
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async (info, thunkAPI) => {
    try {
      const { data, id, access } = info;
      const response = await API.put(`product/${id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + access,
        },
      });
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delteProduct",
  async (info, thunkAPI) => {
    try {
      const { id, access } = info;
      const response = await API.delete(`product/${id}`, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + access,
        },
      });
      return id;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "products/deleteProductImage",
  async (info, thunkAPI) => {
    try {
      const { id, access } = info;

      const response = await API.delete(`image/${id}`, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + access,
        },
      });
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const addreview = createAsyncThunk(
  "product/addReview",
  async (Data, thunkAPI) => {
    try {
      const { access, data } = Data;
      const response = await API.post(`product/addreview/`, data, {
        headers: {
          Authorization: "Bearer " + access,
        },
      });
      console.log(response.data);
      return response.data;
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
      })
      .addCase(addProducts.fulfilled(), (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProducts.fulfilled(), (state, action) => {
        const updateProduct = action.payload;
        const products = state.products.filter(
          (product) => product.id !== updateProduct.id
        );
        state.products = [...products, updateProduct];
      })
      .addCase(deleteProduct.fulfilled(), (state, action) => {
        const products = state.products.filter(
          (product) => product.id != action.payload
        );
        state.products = products;
      })
      .addCase(addreview.fulfilled(), (state, action) => {
        const product_id = action.payload.p_id;
        const product = state.products.find((pro) => pro.id == product_id);
        console.log(product.reviews);
        product.reviews.push(action.payload);
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductsStatus = (state) => state.product.status;
export const selectProductsError = (state) => state.product.error;
export default productSlice.reducer;
