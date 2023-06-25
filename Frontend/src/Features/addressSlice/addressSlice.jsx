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
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (Data, thunkAPI) => {
    try {
      const { access, id } = Data;
      const response = await API.get(`user/address/${id}`, {
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

export const updateSelectedAddress = createAsyncThunk(
  "address/updateSelectedAddress",
  async (Data, thunkAPI) => {
    try {
      const { data, access } = Data;
      const response = await API.put(`user/address/`, data, {
        headers: {
          Authorization: "Bearer " + access,
        },
      });
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    sortAddresses(state) {
      state.Address = state.Address.sort((a1, a2) =>
        a1.price < a2.price ? 1 : a1.price > a2.price ? -1 : 0
      );
    },
  },
  extraReducers(Builder) {
    Builder.addCase(fetchAddresses.fulfilled(), (state, action) => {
      state.Address = action.payload;
      addressSlice.actions.sortAddresses(state);
      state.status = "success";
    })
      .addCase(addAddress.fulfilled(), (state, action) => {
        state.Address.push(action.payload);
        addressSlice.actions.sortAddresses(state);
      })
      .addCase(updateSelectedAddress.fulfilled(), (state, action) => {
        state.Address = action.payload;
        addressSlice.actions.sortAddresses(state);
      });
  },
});

export const selectAddress = (state) => state.Address.Address;
export const selectAddressStatus = (state) => state.Address.status;
export default addressSlice.reducer;
