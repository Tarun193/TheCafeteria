import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

const initialState = {
  brands: [],
};

export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (_, thunkAPI) => {
    const response = await API.get("Brands/");
    return response.data;
  }
);

export const BrandSlice = createSlice({
  initialState,
  name: "Brand",
  extraReducers(Builder) {
    Builder.addCase(fetchBrands.fulfilled(), (state, action) => {
      state.brands = action.payload;
    });
  },
});

export const selectAllBrands = (state) => state.Brand.brands;
export default BrandSlice.reducer;
