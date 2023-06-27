import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/API/api";
import jwt from "jwt-decode";

const initialState = {
  tokenPair: null,
  loggedIn: false,
  userDetails: null,
  sessionTimeID: null,
  error: "",
  processing: null,
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async (userInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await API.post("token/", JSON.stringify(userInfo));
      // refreshing tokens with given Interval;
      const refreshInterval = 4.5 * 60 * 1000;
      const refreshID = setTimeout(
        () => dispatch(refreshToken()),
        refreshInterval
      );
      dispatch(authSlice.actions.setRefreshTimeID({ refreshID }));
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      // getting the token pair and referesh session time ID from the the current state.
      const { auth } = getState();
      const { tokenPair, sessionTimeID } = auth;
      // Sending an response to api to get new access token from current refresh token.
      const response = await API.post(
        "token/refresh/",
        JSON.stringify({
          refresh: tokenPair?.refresh
            ? tokenPair?.refresh
            : localStorage.getItem("refresh"),
        })
      );
      // Checking wheather the old session ID exists or not if yes, we will clear that id and going to create an setInterval for new refresh
      if (sessionTimeID) {
        clearTimeout(sessionTimeID);
      }

      // refreshing tokens with given Interval;
      const refreshInterval = 4.5 * 60 * 1000;
      const refreshID = setTimeout(
        () => dispatch(refreshToken()),
        refreshInterval
      );
      dispatch(authSlice.actions.setRefreshTimeID({ refreshID }));
      return response.data;
    } catch (e) {
      dispatch(logout());
      rejectWithValue(e.response.data);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "userSignUp",
  async (SignUpInfo, ThunkAPI) => {
    try {
      const response = await API.post("SignUp/", SignUpInfo);
    } catch (e) {
      return ThunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRefreshTimeID(state, action) {
      state.sessionTimeID = action.payload.refreshID;
    },
    logout(state) {
      const oldtime = state.sessionTimeID;
      if (oldtime) {
        clearTimeout(oldtime);
      }
      localStorage.removeItem("refresh");
      return { ...initialState };
    },
    setProccessing(state, action) {
      state.processing = action.payload.processing;
    },
  },
  extraReducers(Builder) {
    Builder.addCase(userLogin.fulfilled(), (state, action) => {
      if (action.payload) {
        state.tokenPair = action.payload;
        state.loggedIn = true;
        const data = jwt(action.payload.access);
        const name = data.name;
        const user_id = data.user_id;
        const admin = data.admin;
        state.userDetails = { name, user_id, admin };
        localStorage.setItem("refresh", action.payload.refresh);
        state.processing = false;
        state.error = "";
      }
    })
      .addCase(userLogin.rejected(), (state, action) => {
        state.error = action.payload.detail;
        state.processing = false;
      })
      .addCase(refreshToken.fulfilled(), (state, action) => {
        if (action.payload) {
          state.tokenPair = {
            access: action.payload.access,
            refresh: localStorage.getItem("refresh"),
          };
          state.loggedIn = true;
          const data = jwt(action.payload.access);
          const name = data.name;
          const user_id = data.user_id;
          const admin = data.admin;
          state.userDetails = { name, user_id, admin };
        }
      });
  },
});

export const getAuthToken = (state) => state.auth.tokenPair;
export const isLoggedIn = (state) => state.auth.loggedIn;
export const getuserInfo = (state) => state.auth.userDetails;
export const getError = (state) => state.auth.error;
export const getProccessingStatus = (state) => state.auth.processing;
export const { logout, setProccessing } = authSlice.actions;
export default authSlice.reducer;
