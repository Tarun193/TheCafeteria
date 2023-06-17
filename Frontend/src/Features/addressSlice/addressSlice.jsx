import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

const initialState = {
  Address: [],
  status: "idle",
  errors: "",
};

export const addAddress = createAsyncThunk(
  "address/createAddress",
  async (Data, thunkAPI) => {
    try {
      const { data, access } = Data;
      const response = await API.post(`user/address/`, data, {
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

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
});

export default addressSlice.reducer;
