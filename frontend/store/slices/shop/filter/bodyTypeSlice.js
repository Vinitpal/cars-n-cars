import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "All",
};

export const bodyTypeSlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    setBodyType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBodyType } = bodyTypeSlice.actions;
export default bodyTypeSlice.reducer;
