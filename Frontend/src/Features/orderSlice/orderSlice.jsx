import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

const initialState = {
  orders: [],
  status: "idle",
  processing: null,
};

export const fetchOrders = createAsyncThunk(
  "cart/fetchOrders",
  async (data, thunkAPI) => {
    try {
      const { id, access } = data;
      const response = await API.get(`user/orders/${id}`, {
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

const ordersSlice = createSlice({
  initialState,
  name: "orders",
  reducers: {
    sortOrders(state) {
      state.orders = state.orders.sort((o1, o2) =>
        o1.price < o2.price ? 1 : o1.price > o2.price ? -1 : 0
      );
    },
  },
  extraReducers(Builder) {
    Builder.addCase(fetchOrders.fulfilled(), (state, action) => {
      state.orders = action.payload;
      ordersSlice.actions.sortOrders(state);
      state.status = "success";
    });
  },
});

export const selectAllOrders = (state) => state.order.orders;
export const selectOrdersStatus = (state) => state.order.status;
export default ordersSlice.reducer;
