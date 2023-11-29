import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    scrollWidth: (state, action) => {
      state.value = action.payload > 899 ? 352 : 282;
    },
  },
});

export const { scrollWidth } = scrollSlice.actions;
export default scrollSlice.reducer;
