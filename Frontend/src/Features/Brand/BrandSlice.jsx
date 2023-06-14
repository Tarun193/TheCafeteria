import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

const initialState = {
  brands: [],
  status: "idle",
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
    Builder.addCase(fetchBrands.pending(), (state, action) => {
      state.status = "loading";
    }).addCase(fetchBrands.fulfilled(), (state, action) => {
      state.brands = action.payload;
      state.status = "success";
    });
  },
});

export const selectAllBrands = (state) => state.Brand.brands;
export const selectBrandStatus = (state) => state.Brand.status;
export default BrandSlice.reducer;
