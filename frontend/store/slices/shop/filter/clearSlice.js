import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const clearSlice = createSlice({
  name: "clear-filter",
  initialState,
  reducers: {
    setClearFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setClearFilter } = clearSlice.actions;
export default clearSlice.reducer;
