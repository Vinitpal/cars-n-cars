import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "All",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
