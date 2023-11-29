import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const basicDetailSlice = createSlice({
  name: "basicDetailValue",
  initialState,
  reducers: {
    setBasicDetailValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBasicDetailValue } = basicDetailSlice.actions;
export default basicDetailSlice.reducer;
