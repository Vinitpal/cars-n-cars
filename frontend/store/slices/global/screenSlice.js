import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    width: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { width } = screenSlice.actions;
export default screenSlice.reducer;
