import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export const selectSearch = (state) => state.search.search;
export default searchSlice.reducer;
