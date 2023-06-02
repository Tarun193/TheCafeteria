import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

const initialState = {
  tokenPair: {},
  loggedIn: false,
};

export const userLogin = createAsyncThunk("userLogin", async (userInfo) => {
  try {
    const response = await API.post("token/", JSON.stringify(userInfo));
    return response.data;
  } catch (e) {
    console.log("error is: ", e);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(Builder) {
    Builder.addCase(userLogin.fulfilled(), (state, action) => {
      if (action.payload) {
        state.tokenPair = action.payload;
        state.loggedIn = true;
      }
    }).addCase(userLogin.rejected(), (state, action) => {
      console.log(action.error);
    });
  },
});

export const getAuthToken = (state) => state.auth.tokenPair;
export const isLoggedIn = (state) => state.auth.loggedIn;
export default authSlice.reducer;
