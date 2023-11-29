import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const startSearchSlice = createSlice({
  name: "startSearch",
  initialState,
  reducers: {
    setStartSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStartSearch } = startSearchSlice.actions;
export default startSearchSlice.reducer;
