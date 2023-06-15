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

export const addCartItem = createAsyncThunk(
  "Cart/addCartItem",
  async (data, thunkAPI) => {
    const { Data, access } = data;
    try {
      const response = await API.post(`${Data.user_id}/cart/`, Data, {
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

export const removeCartItem = createAsyncThunk(
  "Cart/removeCartItem",
  async (data, thunkAPI) => {
    const { userId, cart_id, access } = data;
    try {
      const response = await API.delete(`${userId}/cart/${cart_id}`, {
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
    Builder.addCase(addCartItem.fulfilled(), (state, action) => {
      if (action.payload) {
        state.cart.push(action.payload);
      }
    })
      .addCase(fetchCart.pending(), (state, action) => {
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
      })
      .addCase(removeCartItem.fulfilled(), (state, action) => {
        state.cart = state.cart.filter((item) => item.id != action.payload.id);
      });
  },
});

export const selectCart = (state) => state.cart.cart;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLength = (state) => state.cart?.cart?.length;
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
