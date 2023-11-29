import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "All",
};

export const brandSlice = createSlice({
  name: "Brand",
  initialState,
  reducers: {
    setFilterBrand: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFilterBrand } = brandSlice.actions;
export default brandSlice.reducer;
