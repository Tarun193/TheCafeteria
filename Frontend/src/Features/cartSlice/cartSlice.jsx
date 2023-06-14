import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import API from "../../utils/API/api";

const initialState = {
  cart: null,
  status: "idle",
  processing: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (data, thunkAPI) => {
    try {
      const { id, access } = data;
      const response = await API.get(`${id}/cart`, {
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

export const updateCartProductQuantity = createAsyncThunk(
  "Cart/updateCartProductQuantity",
  async (data, thunkAPI) => {
    const { Data, access } = data;
    try {
      const response = await API.put(`${Data.userId}/cart/`, Data, {
        headers: {
          Authorization: "Bearer " + access,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      return { ...initialState };
    },
  },
  extraReducers(Builder) {
    Builder.addCase(fetchCart.pending(), (state, action) => {
      state.status = "loading";
    })
      .addCase(fetchCart.fulfilled(), (state, action) => {
        state.cart = action.payload;
        state.status = "success";
      })
      .addCase(updateCartProductQuantity.fulfilled(), (state, action) => {
        state.cart = state.cart.filter(
          (cartitem) => cartitem.id != action.payload.id
        );
        state.cart.push(action.payload);
      });
  },
});

export const selectCart = (state) => state.cart.cart;
export const selectCartStatus = (state) => state.cart.status;
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
